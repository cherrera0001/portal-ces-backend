const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    stage: { type: Number, default: 0 },
    simulationId: { type: Number, required: true, unique: true, index: true },
    sellerIdentificationValue: { type: String, default: '' },
    amicarExecutiveIdentificationValue: { type: String, default: '' },
    customer: {
      identificationTypeId: { type: Number, default: 1 },
      identificationValue: { type: String, default: '' },
      documentSerialNumber: { type: String, default: '' },
      name: { type: String, default: '' },
      lastName: { type: String, default: '' },
      motherLastName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
      geographicDataId: { type: String, default: '' },
      dob: { type: String, default: '' },
      nationality: { type: String, default: '' },
      gender: { type: String, default: '' },
    },
    customerRequestData: {
      maritalStatus: { type: String, default: '' },
      maritalRegime: { type: String, default: '' },
      academicLevel: { type: String, default: '' },
      livingHousehold: { type: String, default: '' },
      profession: { type: String, default: ' ' },
      generalComments: { type: String, default: '' },
    },
    customerActivity: {
      workType: { type: String, default: '' },
      activityTypeId: { type: String, default: '' },
      workPosition: { type: String, default: '' },
      workEntryDate: { type: String, default: '' },
      employerName: { type: String, default: '' },
      employerIdentificationTypeId: { type: Number, default: 1 },
      employerIdentificationValue: { type: String, default: '' },
      businessSectorId: { type: String, default: '' },
      workAddress: { type: String, default: '' },
      workGeographicDataId: { type: String, default: '' },
      workPhone: { type: String, default: '' },
      employmentContractType: { type: String, default: '' },
      salaryType: { type: String, default: 'FI' },
      salaryPayday: { type: Number, default: 0 },
    },
    income: {
      salary: { type: Number, default: 0 },
      honorarium: { type: Number, default: 0 },
      retirementSalary: { type: Number, default: 0 },
      pensionSalary: { type: Number, default: 0 },
      rentalIncome: { type: Number, default: 0 },
      otherIncome: { type: Number, default: 0 },
      descriptionForOtherIncome: { type: String, default: '' },
    },
    otherIncome: {
      year: { type: Number, default: 0 },
      folioNumber: { type: Number, default: 0 },
      code18: { type: Number, default: 0 },
      code25: { type: Number, default: 0 },
      code36: { type: Number, default: 0 },
      code158: { type: Number, default: 0 },
      code170: { type: Number, default: 0 },
      code305: { type: Number, default: 0 },
      code461: { type: Number, default: 0 },
      code545: { type: Number, default: 0 },
      code611: { type: Number, default: 0 },
      code628: { type: Number, default: 0 },
      code636: { type: Number, default: 0 },
    },
    expenses: {
      mortgageCost: { type: Number, default: 0 },
      otherFixedExpenses: { type: Number, default: 0 },
    },
    taxReturn: [
      {
        dateTax: { type: String, default: '' },
        purchaseTax: { type: Number, default: 0 },
        salesTax: { type: Number, default: 0 },
      },
    ],
    spouseData: {
      identificationType: { type: Number },
      identificationValue: { type: String },
      name: { type: String },
      lastName: { type: String },
      motherLastName: { type: String },
      address: { type: String },
      spouseGeographicDataId: { type: String },
      workType: { type: String },
      activityTypeId: { type: String },
      employerName: { type: String },
      workPhone: { type: String },
      combinedIncome: { type: Boolean },
      salary: { type: Number },
    },
    buyForAnother: {
      identificationTypeId: { type: Number },
      identificationValue: { type: String },
      name: { type: String },
      lastName: { type: String },
      motherLastName: { type: String },
      address: { type: String },
      geographicDataId: { type: String },
      dob: { type: String },
      nationalityId: { type: String },
      maritalStatus: { type: String },
      maritalRegime: { type: String },
    },
    guarantor: [
      {
        identificationTypeId: { type: Number, default: 1 },
        identificationValue: { type: String, default: '' },
        name: { type: String, default: '' },
        lastName: { type: String, default: '' },
        motherLastName: { type: String, default: '' },
        address: { type: String, default: '' },
        geographicDataId: { type: String, default: '' },
        dob: { type: String, default: '' },
        nationalityId: { type: String, default: '' },
        maritalStatus: { type: String, default: '' },
        maritalRegime: { type: String, default: '' },
        workType: { type: String, default: '' },
        activityTypeId: { type: String, default: '' },
        salary: { type: Number, default: 0 },
        gender: { type: String, default: '' },
        academicLevel: { type: String, default: '' },
        livingHousehold: { type: String, default: '' },
        profession: { type: String, default: '' },
        businessSectorId: { type: String, default: '' },
        employmentContractType: { type: String, default: '' },
        salaryType: { type: String, default: '' },
        salaryPayday: { type: Number, default: 0 },
      },
    ],
    bankInformation: {
      type: [
        {
          codeId: { type: String, default: '' },
          automaticPayment: { type: Boolean, default: false },
          accountNumber: { type: String, default: '' },
        },
      ],
    },
    heritage: [
      {
        type: { type: String, default: '' },
        description: { type: String, default: '' },
        saleValue: { type: Number, default: 0 },
        financing: { type: String, default: '' },
        stillPaying: { type: Boolean, default: false },
      },
    ],
    personalReferences: {
      type: [
        {
          name: { type: String, default: '' },
          type: { type: String, default: '' },
          address: { type: String, default: '' },
          phone: { type: String, default: '' },
        },
      ],
    },
    vehicleData: {
      brandName: { type: String, default: '' },
      modelName: { type: String, default: '' },
      version: { type: String, default: '' },
      year: { type: Number, default: 0 },
    },
    loan: {
      loanType: { type: String, default: '' },
      rateType: {
        description: { type: String, default: '' },
        cod: { type: String, default: '' },
      },
      cae: { type: Number, default: 0 },
      customerRate: { type: Number, default: 0 },
      monthlyPayment: { type: Number, default: 0 },
      term: { type: Number, default: 0 },
      totalLoanCost: { type: Number, default: 0 },
      vfg: {
        payment: { type: Number, required: false },
        paymentNumber: { type: Number, required: false },
      },
    },
    externalIds: [{ type: String, required: true }],
    awardedTime: { type: Date, required: false },
    status: { type: Object, required: true },
    salesRoomId: { type: Number, required: false },
  },
  {
    collection: 'loansApplications',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('LoansApplication', schema, 'loansApplications');
