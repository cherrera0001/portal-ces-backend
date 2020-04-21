import axios from 'axios';
import { ApolloError } from 'apollo-server-express';
import { LoansModel } from '../../../../helpers/modelsExport';

const { CORE_UPLOAD_DOCUMENT_URL } = process.env;
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE_IN_KB = 40000000;

const uploadDocument = async (loanId, file, fileName, documentType) => {
  const response = await axios({
    method: 'post',
    url: CORE_UPLOAD_DOCUMENT_URL,
    data: {
      loanId,
      file,
      fileName,
      documentType,
    },
  });
  if (response.status !== 200) {
    throw new Error(`${__dirname}/uploadDocument::ERROR`);
  }
};

export default async ({ data, rollbar }) => {
  try {
    const { files, loanId, documentSetId, documentType } = data;
    for await (const fileStream of files) {
      const { createReadStream, filename, mimetype } = fileStream;
      const chunks = [];

      if (!ALLOWED_MIME_TYPES.includes(mimetype)) throw new Error('INCORRECT_FILE_TYPE');

      await new Promise((resolve, reject) =>
        createReadStream()
          .on('data', (chunk) => {
            chunks.push(chunk);
          })
          .on('close', () => resolve())
          .on('error', (err) => reject(err)),
      );

      const file = Buffer.concat(chunks);

      if (file.byteLength >= MAX_FILE_SIZE_IN_KB) throw new Error('INCORRECT_FILE_SIZE');

      await uploadDocument(loanId, file.toString('base64'), filename, documentType);

      const loan = await LoansModel.findOne({ loanId, 'checkList.id': documentSetId });
      loan.checkList.forEach((document) => {
        if (document.id === documentSetId) {
          document.wasSent = true;
          document.step = 1;
        }
      });
      loan.save();
      return loan;
    }
  } catch (err) {
    if (err.message === 'INCORRECT_FILE_TYPE')
      throw new ApolloError('Incorrect file type. Must be one of: jpeg, jpg, png, pdf', 'INCORRECT_FILE_TYPE');

    if (err.message === 'INCORRECT_FILE_SIZE')
      throw new ApolloError('Max file size exceeded. Must be under 40mb per file', 'INCORRECT_FILE_SIZE');

    rollbar.log(`src/methods/chl/v1/uploadDocuments/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
