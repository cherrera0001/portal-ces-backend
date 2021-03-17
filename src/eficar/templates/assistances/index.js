const generateTireProtection = require('./tireProtection.assistance');
const generateProtecar = require('./protecar.assistance');
const generateMandate = require('./mandate.assistance');
const generateProtectedFamily = require('./protectedFamily.assistance');
const generateMecanicalGuaranty = require('./mechanicalGuaranty.assistance');

const generateApprovementLetter = require('./approvementLetter');


module.exports = {
  generateProtecar,
  generateTireProtection,
  generateMandate,
  generateProtectedFamily,
  generateMecanicalGuaranty,
  generateApprovementLetter,

};
