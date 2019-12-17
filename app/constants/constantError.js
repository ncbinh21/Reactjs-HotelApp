const newError = (message, httpStatusCode, errorCode) => {
    let error = new Error(message);
    error.httpStatusCode = httpStatusCode;
    error.code = errorCode;
    return error;
}   

module.exports = {
    Errors: {
        InvalidParams: newError('Invalid params!', 400),
        InvalidEmail: newError('Invalid email address!', 400),
        InvalidToken: newError('Invalid token!', 400),
        RequestFailed: newError('Request failed!', 400),
        AccountNotExist: newError('Account is not exist!', 400),
        EmailIsUsed: newError('Email address is used!', 400),
        UsernameIsUsed: newError('Username is used!', 400),
        SessionInvalid: newError('Session is expired!', 400)
    }
}