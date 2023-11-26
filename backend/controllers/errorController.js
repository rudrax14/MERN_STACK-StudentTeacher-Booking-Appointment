module.exports = (err, req, res, next) => {
    let error = Object.create(err)
    error.statusCode = error.statusCode || 500
    error.status = error.status || "Fail"
    console.log(error)
    res.status(error.statusCode).json({
        status: error.status,

        message: error.message,
        stack: err.stack
    })
}


