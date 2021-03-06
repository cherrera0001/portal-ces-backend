const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    loanSimulationData: {
      id: { type: Number, required: false },
      customerDataId: { type: Number, required: false },
      salesRoomId: { type: Number, required: false },
      ratesId: { type: Number, required: false },
      loanTypeId: { type: Number, required: false },
      salesRepresentativeId: { type: String, required: false },
      amicarExecutiveId: { type: String, required: false },
      status: { type: String, required: false },
      dateOfLoanStart: { type: Date, required: false },
      dateOfFirstDue: { type: Date, required: false },
      daysDelayedFirstDue: { type: Number, required: false },
      term: { type: Number, required: false },
      totalToFinance: { type: Number, required: false },
      downPayment: { type: Number, required: false },
      balance: { type: Number, required: false },
      monthlyPayment: { type: Number, required: false },
      finalCapital: { type: Number, required: false },
      annualCAE: { type: Number, required: false },
      externalId: { type: String, required: false },
      totalSurchargesToMAF: { type: Number, required: false },
      campaign: { type: String, required: false },
      currencyType: { type: String, required: false },
      accessories: { type: Number, required: false },
      tradeInCarValue: { type: Number, required: false },
      dealerRate: { type: Number, required: false },
      UFValue: { type: Number, required: false },
      totalSurchargesToQuote: { type: Number, required: false },
      factorTotal: { type: Number, required: false },
      promissoryFactor: { type: Number, required: false },
      promissoryValue: { type: Number, required: false },
      totalToFinanceUF: { type: Number, required: false },
      delayedInterest: { type: Number, required: false },
      dealerCommission: { type: Number, required: false },
      amicarCommission: { type: Number, required: false },
      customerRate: { type: Number, required: false },
      totalLoanCost: { type: Number, required: false },
      monthlyCAE: { type: Number, required: false },
      auctionTimeEnded: { type: Boolean, required: false },
      auctionTime: { type: String, required: false },
      createdAt: { type: Date, required: false },
      updatedAt: { type: Date, required: false },
      deletedAt: { type: Date, required: false },
      LoanType: {
        id: { type: Number, required: false },
        description: { type: String, required: false },
        cod: { type: String, required: false },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
      },
      Rate: {
        id: { type: Number, required: false },
        financingEntityId: { type: Number, required: false },
        rateTypeId: { type: Number, required: false },
        vehicleTypeId: { type: Number, required: false },
        loanTypeId: { type: Number, required: false },
        salesChannelId: { type: Number, required: false },
        customerRate: { type: Number, required: false },
        baseRate: { type: Number, required: false },
        dealerRate: { type: Number, required: false },
        termsFrom: { type: Number, required: false },
        termsTo: { type: Number, required: false },
        amountFinancedFrom: { type: Number, required: false },
        amountFinancedTo: { type: Number, required: false },
        fee: { type: Number, required: false },
        highlight: { type: Number, required: false },
        immediateOption: { type: Boolean, required: false },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
        deletedAt: { type: Date, required: false },
        RateType: {
          id: { type: Number, required: false },
          description: { type: String, required: false },
          cod: { type: String, required: false },
        },
      },
      SalesRoom: {
        id: { type: Number, required: false },
        salesChannelId: { type: Number, required: false },
        name: { type: String, required: false },
        address: { type: String, required: false },
        latLong: [{ type: Number, required: false }],
        type: { type: String, required: false },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
        deletedAt: { type: Date, required: false },
        SalesChannel: {
          id: { type: Number, required: false },
          identificationTypeId: { type: Number, required: false },
          salesChannelTypeId: { type: Number, required: false },
          identificationValue: { type: String, required: false },
          description: { type: String, required: false },
          apiKey: { type: String, required: false },
          createdAt: { type: Date, required: false },
          updatedAt: { type: Date, required: false },
          deletedAt: { type: Date, required: false },
          SalesChannelType: {
            id: { type: Number, required: false },
            description: { type: String, required: false },
            createdAt: { type: Date, required: false },
            updatedAt: { type: Date, required: false },
            deletedAt: { type: Date, required: false },
          },
        },
      },
    },
    finalLoanValues: { type: Object, required: true },
    equivalentAnnualCharge: { type: Object, required: true },
    customerRequestData: { type: Object, required: true },
    income: { type: Object, required: true },
    otherIncome: { type: Object, required: true },
    expenses: { type: Object, required: true },
    taxReturn: [{ type: Object, required: true }],
    spouseData: { type: Object, required: false },
    guarantor: [{ type: Object, required: true }],
    buyForAnother: { type: Object, required: false },
    amortizationSchedule: [{ type: Object, required: true }],
    surchargesAndInsurances: [{ type: Object, required: true }],
    customerActivity: { type: Object, required: true },
    indexaProductsConversion: [{ type: Object, required: true }],
    bankInformation: [{ type: Object, required: true }],
    personalReferences: [{ type: Object, required: true }],
    loanSimulationCar: { type: Object, required: true },
    tradeInCar: [{ type: Object, required: true }],
    heritage: [{ type: Object, required: true }],
    customer: { type: Object, required: true },
    stage: { type: Number, required: false },
    simulationId: { type: Number, required: true, index: true },
    financingEntityId: { type: String, required: true, index: true },
    loanStatus: { type: Object, required: true },
    finalLoanStatus: { type: Object, required: false },
    riskAnalyst: { type: Object, default: null },
    checkListSent: {
      type: {
        sentAt: { type: Date, required: false },
        checklistId: { type: Number, required: false },
        checkListItems: [
          {
            type: Object,
          },
        ],
        proposedBaseRate: { type: Number, required: false },
        comment: { type: String, required: false },
      },
      default: null,
    },
    awardedTime: { type: Date, required: false },
    sellerIdentificationValue: { type: String, required: false },
    amicarExecutiveIdentificationValue: { type: String, required: false },
  },
  {
    collection: 'auctions',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`eficar_${process.env.NODE_ENV}`);
module.exports = db.model('Auctions', schema);
