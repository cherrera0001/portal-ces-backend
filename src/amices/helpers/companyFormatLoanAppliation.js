const format = (incomeData, externalIds) => {
  try {
    const {
      customerRequestData,
      customerActivity,
      spouseData,
      buyForAnother,
      guarantor,
      bankInformation,
      heritage,
      personalReferences,
      loanSimulationCar,
      amortizationSchedule,
      customer,
      taxReturn,
      legalRepresentative,
      majorityPartners,
      loanSimulationData,
    } = incomeData;
    const loanType = loanSimulationData.LoanType.cod;
    const vfg = loanType === 'SMART' ? amortizationSchedule.find((schedule) => schedule.quotaType === 'SMART') : null;
    const buyForAnotherFormated =
      Object.keys(buyForAnother).length > 0
        ? {
            ...buyForAnother,
            nationalityId: buyForAnother.nationalityData.externalCode,
            geographicDataId: buyForAnother.geographicData.COMMUNE.externalCode,
            maritalStatus: buyForAnother.maritalStatusData.externalCode,
            maritalRegime: buyForAnother.maritalRegimeData.externalCode,
          }
        : {};
    const guarantorFormated = guarantor.length
      ? guarantor.map((el) => ({
          ...el,
          geographicDataId: el.geographicData.COMMUNE.externalCode,
          nationalityId: el.nationalityData.externalCode,
          maritalStatus: el.maritalStatusData.externalCode,
          maritalRegime: el.maritalRegimeData.externalCode,
          workType: el.workTypeData.externalCode,
          activityTypeId: el.activityTypeData.externalCode,
        }))
      : [];

    return {
      ...incomeData,
      loanSimulationCar: { ...loanSimulationCar, vehicleType: loanSimulationCar.VehicleType.externalCode },
      customer: {
        ...customer,
        geographicDataId: customer.geographicData.COMMUNE.externalCode,
        businessSectorId: customer.businessSectorData.externalCode,
      },
      customerActivity: {},
      buyForAnother: buyForAnotherFormated,
      legalRepresentative: [],

      guarantor: guarantorFormated,
      legalRepresentative: legalRepresentative.length
        ? legalRepresentative.map((el) => ({
            ...el,
            geographicDataId: el.geographicData.COMMUNE.externalCode,
            maritalStatus: el.maritalStatusData.externalCode,
            // activityTypeId: el.activityTypeData.externalCode,
          }))
        : [],
      bankInformation: bankInformation.length
        ? bankInformation.map((el) => ({
            ...el,
            codeId: el.externalCode,
          }))
        : [],
      heritage: heritage.length
        ? heritage.map((el) => ({
            ...el,
            financing: el.financingTypeData.externalCode,
            type: el.typeExternalCode,
          }))
        : [],
      personalReferences: personalReferences.length
        ? personalReferences.map((el) => ({
            ...el,
            type: el.typeData.externalCode,
          }))
        : [],
      loan: {
        ...loanSimulationData,
        rateType: loanSimulationData.Rate.RateType,
        cae: loanSimulationData.annualCAE,
        loanType,
        vfg,
      },
      vehicleData: {
        brandName: loanSimulationCar.Brand.name,
        modelName: loanSimulationCar.Model.name,
        version: loanSimulationCar.carVersion,
        year: loanSimulationCar.year,
      },
      simulationId: loanSimulationData.id,
      salesRoomId: loanSimulationData.SalesRoom.id,
      sellerIdentificationValue: loanSimulationData.salesRepresentative.rut,
      amicarExecutiveIdentificationValue: loanSimulationData.amicarExecutive.rut,
      externalIds,
    };
  } catch (e) {
    console.log(e, 'error');
  }
};
module.exports = format;
