const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const DocumentsToSign = require('eficar/models/documentsToSign.model');
const Config = require('eficar/models/configs.model');
const errors = require('eficar/errors');
const HTTP = require('requests');

const { CORE_URL } = process.env;

const upload = async (req, res) => {};
const update = async (req, res) => {};
const download = async (req, res) => {};
const deleteDocuments = async (req, res) => {};

module.exports = {
  update,
  upload,
  download,
  deleteDocuments,
};
