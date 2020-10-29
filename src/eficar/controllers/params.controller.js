const aqp = require('api-query-params');
const Params = require('eficar/models/params.model');

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const params = await Params.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Params.find(filter).select(projection);

  res.json({
    total: total.length,
    result: params,
  });
};

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

const lists = async (req, res) => {
  const coreParams = await Params.aggregate(getQuery());

  return res.json({
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
  });
};

const getOne = async (filter) => {
  const response = await Params.findOne(filter);
  return response;
};

const get = async (filter) => {
  const response = await Params.find(filter);
  return response;
};

module.exports = { all, lists, getOne, get };
