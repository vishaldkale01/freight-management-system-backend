const  HandleDbErrors = async (error , res) =>{
    if (error.name === 'SequelizeValidationError' || error.name === "SequelizeUniqueConstraintError") {
        const validationErrors = error.errors.map(err => ({
          field: err.path,
          message: err.message
        }));
        // console.error('Validation Errors:', validationErrors);
        return res.status(400).json({ error: 'Validation Error', validationErrors });
}else{
    return res.status(500).json({ error: 'Internal Server Error' });
}
}

module.exports = HandleDbErrors