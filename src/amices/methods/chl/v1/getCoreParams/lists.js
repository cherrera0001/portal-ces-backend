const CoreParamsModel = require('amices/models/coreParams.model');

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

module.exports = async ({ rollbar }) => {
  try {
    const coreParams = await CoreParamsModel.aggregate(getQuery());
    return {
      financingType: coreParams.find((el) => el.type === 'FINANCING_TYPE').values,
      personalReferencesType: coreParams.find((el) => el.type === 'PERSONAL_REFERENCE_TYPE').values,
      heritageType: coreParams.find((el) => el.type === 'HERITAGE_TYPE').values,
      bank: coreParams.find((el) => el.type === 'BANKS').values,
      salaryType: coreParams.find((el) => el.type === 'SALARY_TYPE').values,
      employmentContractType: coreParams.find((el) => el.type === 'EMPLOYMENT_CONTRACT_TYPE').values,
      activityType: coreParams.find((el) => el.type === 'ACTIVITY_TYPE').values,
      workType: coreParams.find((el) => el.type === 'WORK_TYPE').values,
      maritalStatus: coreParams.find((el) => el.type === 'MARITAL_STATUS').values,
      maritalRegime: coreParams.find((el) => el.type === 'MARITAL_REGIME').values,
      academicLevel: coreParams.find((el) => el.type === 'ACADEMIC_LEVEL').values,
      genderType: coreParams.find((el) => el.type === 'GENDER_TYPE').values,
      businessSector: coreParams.find((el) => el.type === 'BUSINESS_SECTOR').values,
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
