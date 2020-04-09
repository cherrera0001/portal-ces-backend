import { LoansModel } from '../../../../helpers/modelsExport';

export default async ({ data, rollbar }) => {
  try {
    const { files, documentSetId } = data;
    for (let i = 0; i < files.length; i++) {
      const { stream, filename, mimetype, encoding } = await files[i];

    }
    return files;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/uploadDocuments/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
