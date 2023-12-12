const errorStaus =  (data, errorMessage) => {
     return {
        message : errorMessage , 
        error : data
    }
};
module.exports = errorStaus