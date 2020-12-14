const mapCompany = (data) => {
  const { customer } = data;
  return {
    ...data,
    stage: 10,
    customer: {
      identificationValue: customer.identificationValue,
      identificationTypeId: customer.identificationTypeId,
      companyName: customer.companyName,
      businessSectorId: customer.businessSectorId,
      businessSectorDescription: customer.businessSectorDescription,
      numberOfWorkers: +customer.numberOfWorkers,
      workPhone: customer.workPhone,
      contactName: customer.contactName,
      contactWorkPosition: customer.contactWorkPosition,
      contactPhone: customer.contactPhone,
      contactWorkPhone: customer.contactWorkPhone,
      contactEmail: customer.contactEmail,
    },
    customerRequestData: {
      maritalStatus: 'SO',
      maritalRegime: 'SB',
      academicLevel: 'SU',
      livingHousehold: '2',
      profession: 'MEDICO',
      generalComments: '',
    },
    customerActivity: {
      workType: 'DE',
      activityTypeId: '5',
      workPosition: 'Jefe de Cirugíaaaaa',
      workEntryDate: '2015-09-30',
      employerName: 'Saysaasd Ltda',
      employerIdentificationTypeId: 2,
      employerIdentificationValue: '26492637-8',
      businessSectorId: '1',
      workAddress: 'Las condes 11000, Vitacura, Región Metropolitana',
      workGeographicDataId: '5602',
      workPhone: '+56234567890',
      employmentContractType: 'CN',
      salaryType: 'FI',
      salaryPayday: 30,
    },
  };
};

module.exports = mapCompany;
