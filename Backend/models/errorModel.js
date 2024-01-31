class HttpError extends Error{
    constructor(message,errorCode){
        super(message)
        this.code = message
    }
}

module.exports = HttpError