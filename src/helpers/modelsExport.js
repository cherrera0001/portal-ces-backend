import mgModels from '../models/mg';

// --------------------- MONGO MODELS EXPORT ---------------------
for (const key of Object.keys(mgModels)) module.exports[key] = mgModels[key];
