import axios from 'axios';
import FormData from 'form-data';

import { LoansModel } from '../../../../helpers/modelsExport';

const { AMIDOC_LOGIN_URL, AMIDOC_LOGIN_USERNAME, AMIDOC_LOGIN_PASSWORD, AMIDOC_UPLOAD_DOCUMENT_URL } = process.env;

const getAlfrescoTicket = async () => {
  const response = await axios({
    method: 'post',
    url: AMIDOC_LOGIN_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: AMIDOC_LOGIN_USERNAME,
      password: AMIDOC_LOGIN_PASSWORD,
    },
  });

  if (response.status !== 200) {
    throw new Error(`${__dirname}/alfresco::getAlfrescoTicket::uploadDocuments::ERROR`);
  } else {
    return response.data.result.alfTicket;
  }
};

const uploadDocumentAlfresco = async (file, fileName, ticket) => {
  const path = 'prueba/amicar/checklist';
  const formDataBody = new FormData();

  formDataBody.append('ticket', ticket);
  formDataBody.append('path', path);
  formDataBody.append('fileName', fileName);
  formDataBody.append('file', file);
  formDataBody.append('documentType', 54);

  const response = await axios({
    method: 'post',
    url: AMIDOC_UPLOAD_DOCUMENT_URL,
    headers: formDataBody.getHeaders(),
    data: formDataBody,
  });

  if (response.status !== 200) {
    throw new Error(`${__dirname}/alfresco::getAlfrescoTicket::uploadDocumentAlfresco::ERROR`);
  } else {
    return response.data.result.uuid;
  }
};

export default async ({ data, rollbar }) => {
  try {
    const ticket = await getAlfrescoTicket();
    const { files, documentSetId } = data;

    for await (const fileStream of files) {
      const { createReadStream, filename, mimetype } = fileStream;
      const chunks = [];
      const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];

      // TODO: improve error handling
      if (!allowedMimeTypes.includes(mimetype)) return;

      await new Promise((resolve, reject) =>
        createReadStream()
          .on('data', (chunk) => {
            chunks.push(chunk);
          })
          .on('close', () => resolve())
          .on('error', (err) => reject(err)),
      );

      const file = Buffer.concat(chunks).toString('base64');
      const uuid = await uploadDocumentAlfresco(file, filename, ticket);
      // TODO: save uuid in loans using documentSetId
    }
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/uploadDocuments/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
