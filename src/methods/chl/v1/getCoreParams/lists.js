import { CoreParamsModel } from '../../../../helpers/modelsExport';

const getQuery = () => {
  return [
    { $group: { _id: '$type', values: { $push: '$$ROOT' } } },
    {
      $project: {
        _id: 0,
        type: '$_id',
        values: '$values',
      },
    },
  ];
};

export default async ({ data, rollbar }) => {
  try {
    const coreParams = await CoreParamsModel.aggregate(getQuery());
    return {
      maritalStatus: coreParams.find((el) => el.type === 'MARITAL_STATUS').values,
      maritalRegime: coreParams.find((el) => el.type === 'MARITAL_REGIME').values,
      academicLevel: coreParams.find((el) => el.type === 'ACADEMIC_LEVEL').values,
      genderType: coreParams.find((el) => el.type === 'GENDER_TYPE').values,
      livingHousehold: coreParams.find((el) => el.type === 'LIVING_HOUSEHOLD').values,
      region: coreParams.find((el) => el.type === 'REGION').values,
      commune: coreParams.find((el) => el.type === 'COMMUNE').values,
      nationality: coreParams.find((el) => el.type === 'NATIONALITY').values,
    };
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getCoreParams/lists::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
