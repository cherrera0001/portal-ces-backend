const mgModels = require('../models/mg');

// --------------------- MONGO MODELS EXPORT ---------------------
for (const key of Object.keys(mgModels)) module.exports[key] = mgModels[key];
