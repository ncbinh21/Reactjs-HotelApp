const ConstantErrors = require('../constants/constantError.js');

module.exports = () => {
    return (req, res, next) => {
        try {
            console.log('Middleware Running ...');
            let user = req.session.user;
            if(!user || !user._id) {
                throw ConstantErrors.Errors.SessionInvalid;
            }
            next();
        } catch (error) {
            return res.status(error.httpStatusCode).send({
                message: error.message
            })
        }
    }
}


