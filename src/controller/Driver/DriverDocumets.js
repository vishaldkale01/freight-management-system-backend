const CommonValidator = require('../../middleware/validators/CommonValidators');
const { driverDocuments, drivers } = require('../../model');
const { driverDocumentSchema } = require('../../validators/JoiSchema');
const HandleDbErrors = require('../../validators/dbValidation');

driverDocuments.belongsTo(drivers, {
  foreignKey: 'driver_id',
  onDelete: 'CASCADE', // Delete documents when associated drivers is deleted
});

drivers.hasMany(driverDocuments, {
  foreignKey: {
      name: 'driver_id',
      allowNull: false
  }
});

const AddDocuments = ('/driverDocuments', async (req, res) => {
  try {
    let validate =  CommonValidator(req.body , driverDocumentSchema) 
      if (!validate.validate) {
        return res.send(validate.data)
      }
    const newDriverDocument = await driverDocuments.create(req.body);
    res.status(201).json(newDriverDocument);
  } catch (error) {
    // console.error(error);
    await HandleDbErrors(error , res)
  }
});

const GetDriverDocumes = ("/all", async(req ,res)=>{
  try {
    const Documents = await drivers.findAll({
      include : {
        model : driverDocuments,
        attributes: { exclude: ['createdAt', 'updatedAt'] },      }
    });
    res.status(200).json(Documents)
  } catch (error) {
    console.log("getDriverDocumes >>>>>>>>>>>>>>" , error);
  }
})

// Get all drivers documents
const GetAllDocuments = ('/driverDocuments', async (req, res) => {
  try {
    const driverDocument = await driverDocuments.findAll({
      // attributes : ["name","status"],
      include : {
        model : drivers,
        attributes : ["name","contactNumber","status"],
      }
    });
    // const driverDocuments = await driverDocuments.findAll();
    const Documents = await drivers.findAll({
      // attributes : ["name","status"],
      include : {
        model : driverDocuments,
        // attributes : ["name","contactNumber","status"],
      }
    });
    
    res.status(200).json(driverDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

// Get a specific drivers document by ID
const GetSingledocuments = ('/driverDocuments/:document_id', async (req, res) => {
  const { document_id } = req.params;
  try {
    const driverDocuments = await driverDocuments.findByPk(document_id);
    if (!driverDocuments) {
      return res.status(404).json({ error: 'Driver Document not found' });
    }
    res.status(200).json(driverDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific drivers document by ID
const Updatedocuments = ('/driverDocuments/:document_id', async (req, res) => {
  const { document_id } = req.params;
  try {
    const [updatedRows] = await driverDocuments.update(req.body, {
      where: {documentId : document_id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Driver Document not found' });
    }
    const updatedDriverDocument = await driverDocuments.findByPk(document_id);
    res.status(200).json(updatedDriverDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific drivers document by ID
const DelteDocuments = ('/driverDocuments/:document_id', async (req, res) => {
  const { document_id } = req.params;
  try {
    const deletedRows = await DriverDocument.destroy({
      where: { document_id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Driver Document not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {AddDocuments , GetSingledocuments , GetAllDocuments , Updatedocuments , DelteDocuments ,GetDriverDocumes  }
