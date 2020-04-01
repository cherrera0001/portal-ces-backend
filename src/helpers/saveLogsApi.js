import { LogRequestAPIMgModel } from './modelsExport';
import rollbar from '../config/rollbarConfig';

export default async (req) => {
  const { url, requestBody, responseBody, method, requestId } = req;
  const newLogData = {
    salesChannelCode: 'x',
    action: `${method}: ${url}`,
    requestId,
    loanSimulationDataId: '1',
    requestBody: requestBody || '',
    responseBody: responseBody || '',
    salesChannelApiKey: 'X',
  };
  try {
    await LogRequestAPIMgModel.create(newLogData);
  } catch (err) {
    rollbar.log(`src/helpers/saveLogsApi::ERROR: ${err.message}`);
  }
};
