// import axios from 'axios';

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE_IN_MB = 40;

const uploadDocument = async (file, fileName) => {
  // const response = await axios({
  //   method: 'post',
  //   url: AMIDOC_UPLOAD_DOCUMENT_URL,
  //   headers: formDataBody.getHeaders(),
  //   data: formDataBody,
  // });

  // if (response.status !== 200) {
  //   throw new Error(`${__dirname}/alfresco::getAlfrescoTicket::uploadDocumentAlfresco::ERROR`);
  // } else {
  //   return response.data.result.uuid;
  // }
};

const convertBytesToMb = (bytes) => bytes / 1000000;

export default async ({ data, rollbar }) => {
  try {
    const { files, documentSetId } = data;
    for await (const fileStream of files) {
      const { createReadStream, filename, mimetype } = fileStream;
      const chunks = [];

      if (!ALLOWED_MIME_TYPES.includes(mimetype)) return { error: 'Incorrect file type' };

      // start file streaming
      await new Promise((resolve, reject) =>
        createReadStream()
          .on('data', (chunk) => {
            chunks.push(chunk);
          })
          .on('close', () => resolve())
          .on('error', (err) => reject(err)),
      );

      const file = Buffer.concat(chunks);
      const fileSize = convertBytesToMb(file.byteLength);

      if (fileSize >= MAX_FILE_SIZE_IN_MB) return { error: 'Max file size exceeded' };

      // await uploadDocument(file.toString('base64'), filename);
    }
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/uploadDocuments/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
