require('dotenv').config();
const Users = require('models/users.model');
const AmicesConfigs = require('amices/models/configs.model');
const EficarConfigs = require('eficar/models/configs.model');
const AuctionParticipant = require('amices/models/auctionParticipants.model');
const Assistances = require('amices/models/assistances.model');

const { CORE_URL } = process.env;

require('mongoAmices')();
require('mongoEficar')();

(async () => {
  await AmicesConfigs.deleteMany({});
  const config = new AmicesConfigs({
    allowedMimeTypes: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    allowedFileTypes: '.jpeg, .png, .jpg, .pdf, .xls, .xlsx, .doc, .docx',
    loanStatus: [
      { code: 'DRAFT_SIMULATION', status: 'Simulación guardada', color: 'black' },
      { code: 'SAVED_SIMULATION', status: 'Solicitud guardada', color: 'black' },
      { code: 'FORMALIZED_REQUEST', status: 'En evaluación', color: 'black' },
      { code: 'SIMULATION_SENT', status: 'No accesada', color: 'black' },
      { code: 'CHECKLIST_REJECTED', status: 'Rechazado por checklist', color: 'black' },
      { code: 'CHECKLIST_CONFIRMED', status: 'Checklist confirmado', color: '#3DAC00' },
      { code: 'SIGNING', status: 'Firma de documentación', color: '#3DAC00' },
      { code: 'AWARDED', status: 'Crédito Adjudicado', color: '#3DAC00' },
    ],
    maxFileSizeInKB: 40000000,
    coreToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZTEiLCJydXQiOiI5NjY2NzU2MDgiLCJ1c2VybmFtZSI6IkV2YWx1YWRvciBXZWIgQW1pY2FyIiwiY29tcGFueUlkZW50aWZpY2F0aW9uVmFsdWUiOiI5NjY2NzU2MDgiLCJpYXQiOjE1OTkxNzQ3Mzd9.Lt9yq43sGEukxYFMbDF13POb_h-l4rTkF5OyLwjHSkA',
    terms: [
      { description: '12', key: '12', configType: 'term' },
      { description: '24', key: '24', configType: 'term' },
      { description: '36', key: '36', configType: 'term' },
      { description: '48', key: '48', configType: 'term' },
      { description: '60', key: '60', configType: 'term' },
    ],
    coreUrls: {
      CHECKLIST_DOWNLOAD: `${CORE_URL}/chl/v1/files/checklist/download`,
      GET_SIMULATION: `${CORE_URL}/chl/v1/simulation`,
      SAVE_SIMULATION: `${CORE_URL}/chl/v1/simulation/save`,
      GET_CORE_PARAMS: `${CORE_URL}/chl/v1/core-params`,
      LOAN_APPLICATION: `${CORE_URL}/chl/v1/loan-application`,
      CHECKLIST_UPLOAD_FILES: `${CORE_URL}/chl/v1/files/checklist/upload`,
      SEND_EMAIL: `${CORE_URL}/chl/v1/email`,
    },
  });
  await config.save();

  await Assistances.deleteMany({});
  await Assistances.insertMany([
    {
      id: 1,
      description: 'FAMILIA PROTEGIDA',
    },
    {
      id: 2,
      description: 'GARANTIA MECANICA >5 AÑOS',
    },
    {
      id: 3,
      description: 'GARANTIA MECANICA',
    },
    {
      id: 4,
      description: 'NEUMATICOS',
    },
    {
      id: 5,
      description: 'PROTECAR',
    },
  ]);

  await EficarConfigs.deleteMany({});
  const eficarConfig = new EficarConfigs({
    allowedMimeTypes: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    allowedFileTypes: '.jpeg, .png, .jpg, .pdf, .xls, .xlsx, .doc, .docx',
    maxFileSizeInKB: 40000000,
    coreToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZTEiLCJydXQiOiI5NjY2NzU2MDgiLCJ1c2VybmFtZSI6IkV2YWx1YWRvciBXZWIgQW1pY2FyIiwiY29tcGFueUlkZW50aWZpY2F0aW9uVmFsdWUiOiI5NjY2NzU2MDgiLCJpYXQiOjE1OTkxNzQ3Mzd9.Lt9yq43sGEukxYFMbDF13POb_h-l4rTkF5OyLwjHSkA',
    minimumRate: 0.5,
    loanStatus: [
      { code: 'SAVED_SIMULATION', status: 'No accesada', color: 'black' },
      { code: 'SIMULATION_SENT', status: 'No accesada', color: 'black' },
      { code: 'WINNER', status: 'Otorgado', color: '#3DAC00' },
      { code: 'LOSER', status: 'Asignada a Otra EF', color: 'red' },
      { code: 'REJECTED', status: 'Crédito Rechazado', color: 'black' },
      { code: 'APPROVED', status: 'Crédito Aprobado', color: '#007BDC' },
      { code: 'CONDITIONED', status: 'Crédito Condicionado', color: '#007BDC' },
      { code: 'CHECKLIST_REJECTED', status: 'Rechazado por Checklist', color: 'black' },
      { code: 'CHECKLIST_CONFIRMED', status: 'Checklist Confirmado', color: '#3DAC00' },
      { code: 'EXPIRED', status: 'No se entregó Respuesta a Tiempo', color: 'black' },
      { code: 'EVALUATION_IN_PROCESS', status: 'Pendiente o en Proceso', color: '#007BDC' },
      { code: 'AWARDED', status: 'Crédito Adjudicado', color: '#3DAC00' },
    ],
    coreUrls: {
      UPLOAD_DOCUMENT_TO_SIGN: `${CORE_URL}/chl/v1/files/documents-to-sign/upload`,
      DELETE_DOCUMENT_TO_SIGN: `${CORE_URL}/chl/v1/files/documents-to-sign/delete`,
      DOWNLOAD_DOCUMENTO_TO_SIGN: `${CORE_URL}/chl/v1/files/documents-to-sign/download`,
      CHECKLIST_CONFIRMATION: `${CORE_URL}/chl/v1/financing-entity/checklist-confirmation`,
      CHECKLIST_DOWNLOAD: `${CORE_URL}/chl/v1/files/checklist/download`,
      SEND_FE_RESPONSE: `${CORE_URL}/chl/v1/financing-entity/save-response`,
      GET_CORE_PARAMS: `${CORE_URL}/chl/v1/core-params`,
      CHECKLIST_UPLOAD_FILES: `${CORE_URL}/chl/v1/files/checklist/upload`,
      SEND_EMAIL: `${CORE_URL}/chl/v1/email`,
    },
  });
  await eficarConfig.save();

  await Users.deleteOne({ email: 'mail1@mail.com' });
  const testUser = new Users({
    name: 'Evaluador Web Amicar',
    username: 'Evaluador Web Amicar',
    rut: '966675608',
    email: 'mail1@mail.com',
    password: '$2a$10$0ZXz5YX.2sHGxLMjbT50xuYUBr3./cyUSTXgix6YQ3TkS9rhjBG4S',
    companyIdentificationValue: '966675608',
    sellerIdentificationValue: '112223339',
    amicarExecutiveIdentificationValue: '156681911',
    saleChannel: '829957000',
    saleChannelType: 'IMPORTADOR',
    salesRoomId: 1,
  });
  await testUser.save();

  // AUCTIONS PARTICIPANTS
  await AuctionParticipant.findOneAndUpdate(
    { loanApplicationId: 10000042 },
    {
      loanApplicationId: 10000042,
      auctionParticipants: [
        {
          id: 30,
          status: 'WINNER',
          monthlyPayment: 379569,
          finalCapital: 10429540,
          totalLoanCost: 13664482,
          annualCAE: 29.5,
          FinancingEntity: {
            id: 13,
            identificationValue: '965096604',
            name: 'BANCO FALABELLA',
          },
          Checklists: [
            {
              id: 6,
              IdEF1: 1,
              IdEF2: 4,
              createdAt: '2020-07-10T03:34:38.583Z',
              ChecklistItems: [
                {
                  id: 16,
                  coreParamId: 646,
                  value: null,
                  status: 0,
                  folderPath: null,
                  uuid: null,
                  CoreParam: {
                    name: 'Carnet de Identidad',
                  },
                },
                {
                  id: 17,
                  coreParamId: 647,
                  status: 0,
                  value: null,
                  folderPath: null,
                  uuid: null,
                  CoreParam: {
                    name: 'Tres Ultimas Liquidaciones de Sueldo',
                  },
                },
                {
                  id: 18,
                  coreParamId: 659,
                  status: 0,
                  value: 'Certificado residencia junta vecinal',
                  folderPath: null,
                  uuid: null,
                  CoreParam: {
                    name: 'Otros',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    { upsert: true, useFindAndModify: false },
  );

  process.exit(0);
})();
