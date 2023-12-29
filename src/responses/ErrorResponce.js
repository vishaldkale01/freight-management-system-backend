const errorResponce =  (res, errorCOde ,error, errorMessage ) => {
    const err = {}
    if(error) err.error = error
    if(errorMessage)  err.errorMessage = errorMessage
     res.status(errorCOde).json({
        err
    })
}
module.exports = errorResponce