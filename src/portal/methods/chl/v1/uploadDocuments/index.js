const axios = require('axios');
const path = require('path');
const { ApolloError } = require('apollo-server-express');
const { ConfigModel } = require('portal/helpers/modelsExport');
const { PATH_CORE_ENDPOINT_ALFRESCO } = require('portal/core.services');

const { CORE_URL } = process.env;

const uploadDocuments = async (loanApplicationId, checklistId, files) => {
  const response = await axios({
    method: 'post',
    url: `${CORE_URL}${PATH_CORE_ENDPOINT_ALFRESCO}`,
    data: {
      loanSimulationDataId: loanApplicationId,
      checklistId,
      files,
    },
  });
  if (response.status !== 200) {
    throw new Error(`${__dirname}/uploadDocument::ERROR`);
  }
};

module.exports = async ({ data, rollbar }) => {
  try {
    const { loanApplicationId, checklistId, files, checklistItemId } = data;
    const config = await ConfigModel.findOne();
    const filesToUpload = [];
    if (!config) throw new Error('CONFIG_NOT_FOUND');

    for await (const fileStream of files) {
      const { createReadStream, filename, mimetype } = fileStream;
      const chunks = [];

      if (!config.allowedMimeTypes.includes(mimetype)) throw new Error('INCORRECT_FILE_TYPE');

      await new Promise((resolve, reject) =>
        createReadStream()
          .on('data', (chunk) => {
            chunks.push(chunk);
          })
          .on('close', () => resolve())
          .on('error', (err) => reject(err)),
      );

      const file = Buffer.concat(chunks);
      if (file.byteLength >= config.maxFileSizeInKB) throw new Error('INCORRECT_FILE_SIZE');
      filesToUpload.push({
        file: file.toString('base64'),
        fileExtension: path
          .extname(filename)
          .split('.')
          .join(''),
        checklistItemId,
      });
    }

    await uploadDocuments(loanApplicationId, checklistId, filesToUpload);
    return true;
  } catch (err) {
    if (err.message === 'INCORRECT_FILE_TYPE')
      throw new ApolloError('Incorrect file type. Must be one of: jpeg, jpg, png, pdf', 'INCORRECT_FILE_TYPE');

    if (err.message === 'INCORRECT_FILE_SIZE')
      throw new ApolloError('Max file size exceeded. Must be under 40mb per file', 'INCORRECT_FILE_SIZE');

    rollbar.log(`src/methods/chl/v1/uploadDocuments/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
