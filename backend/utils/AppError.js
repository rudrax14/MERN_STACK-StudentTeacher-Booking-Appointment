class AppError {
    constructor(message,statusCode){
        this.message=message
        this.statusCode=this.statusCode
        this.status='Fail'
        this.isOperational = true
    }
    

}

module.exports = AppError