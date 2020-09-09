const DocumentsToSign = require('amices/models/documentsToSign.model');
const Params = require('amices/controllers/params.controller');
const Configs = require('amices/models/configs.model');
const errors = require('amices/errors');
const HTTP = require('requests');


const list = async (req, res) => {
  const { loanApplicationId } = req.params;
  const documents = await DocumentsToSign.find({ loanApplicationId });
  if (!documents) return errors.notFound(res);

  let accumulator = []
  for (const item of documents) {
    const documentClassification = await Params.getOne({ id:item.document.parentId });
    const classificationIndex = accumulator.findIndex((item)=>item.name === documentClassification.name)

    if(classificationIndex<0){
      accumulator = [
        ...accumulator,
        {
          "name": documentClassification.name,
          documents:[
            item
          ]
        }
      ]
    }
    else{
      accumulator[classificationIndex].documents = [
        ...accumulator[classificationIndex].documents,
        item
      ]
    }
  }

  res.json({
    documentsToSign:accumulator
  });
};

module.exports = {
  list,
};
