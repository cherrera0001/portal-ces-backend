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
      majorityPartners,
      loanSimulationData,
    } = incomeData;
    console.log('sadklasndlkasdlaskjdklasjdalkj', customerRequestData);
    const loanType = loanSimulationData.LoanType.cod;
    const vfg = loanType === 'SMART' ? amortizationSchedule.find((schedule) => schedule.quotaType === 'SMART') : null;
    // const spouseDataFormated =
    //   Object.keys(spouseData).length > 6
    //     ? {
    //         ...spouseData,
    //         spouseGeographicDataId: spouseData.spouseGeographicData.COMMUNE.externalCode,
    //         workType: spouseData.workType.externalCode,
    //         activityType: spouseData.activityType.externalCode,
    //       }
    //     : {};
    // const buyForAnotherFormated =
    //   Object.keys(buyForAnother).length > 0
    //     ? {
    //         ...buyForAnother,
    //         geographicDataId: buyForAnother.geographicData.COMMUNE.externalCode,
    //         nationalityId: buyForAnother.nationalityData.externalCode,
    //         maritalStatus: buyForAnother.maritalStatusData.externalCode,
    //         maritalRegime: buyForAnother.maritalRegimeData.externalCode,
    //       }
    //     : {};
    // const customerActivityFormated = {
    //   ...customerActivity,
    //   workType: customerActivity.workType.externalCode,
    //   activityTypeId: customerActivity.activityType.externalCode,
    //   businessSectorId: customerActivity.businessSector.externalCode,
    //   workGeographicDataId: customerActivity.workGeographicData.COMMUNE.externalCode,
    //   employmentContractType: customerActivity.employmentContractType.externalCode,
    //   salaryType: customerActivity.salaryType.externalCode,
    // };

    return {
      ...incomeData,
      // ...taxReturn,
      loanSimulationCar: { ...loanSimulationCar, vehicleType: loanSimulationCar.VehicleType.externalCode },
      customer: {
        ...customer,
        geographicDataId: customer.geographicData.COMMUNE.externalCode,
        businessSectorId: customer.businessSectorData.externalCode,
      },
      customerActivity: {},
      majorityPartners,
      customerRequestData: {
        // ...customerRequestData,
        // maritalStatus: customerRequestData.maritalStatus.externalCode,
        // maritalRegime: customerRequestData.maritalRegime.externalCode,
        // academicLevel: customerRequestData.academicLevel.externalCode,
        // livingHousehold: customerRequestData.livingHousehold.externalCode,
      },
      // spouseData: spouseDataFormated,
      // buyForAnother: buyForAnotherFormated,
      // guarantor: guarantor.length
      //   ? guarantor.map((el) => ({
      //       ...el,
      //       geographicDataId: el.geographicData.COMMUNE.externalCode,
      //       nationalityId: el.nationalityData.externalCode,
      //       maritalStatus: el.maritalStatusData.externalCode,
      //       maritalRegime: el.maritalRegimeData.externalCode,
      //       workType: el.workTypeData.externalCode,
      //       activityTypeId: el.activityTypeData.externalCode,
      //     }))
      //   : [],
      // bankInformation: bankInformation.length
      //   ? bankInformation.map((el) => ({
      //       ...el,
      //       codeId: el.externalCode,
      //     }))
      //   : [],
      // heritage: heritage.length
      //   ? heritage.map((el) => ({
      //       ...el,
      //       financing: el.financingTypeData.externalCode,
      //       type: el.typeExternalCode,
      //     }))
      //   : [],
      // personalReferences: personalReferences.length
      //   ? personalReferences.map((el) => ({
      //       ...el,
      //       type: el.typeData.externalCode,
      //     }))
      //   : [],
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
