const Accounts = require('../models/AccountsModel.js');
// const pbkdf2 = require('pbkdf2')

exports.loginPost = (req, res, next) => {
    Accounts.findOne({username: req.body.username})
    .then(data => {
        if(!data || data.password !== req.body.password) {
            return res.status(400).send({
                message: 'The username or password is incorrect'
            })
        }
        req.session.user = data;
        return res.status(200).send({
            message: 'Login Successfully',
            data: data
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: err.message || 'The username or password is incorrect'
            })
        }
        return res.status(500).send({
            message: err.message || 'An error occurred while processing your request'
        })
    })
};

exports.checkLogin = (req, res, next) => {
    if(req.session.user && req.session.user._id) {
        return res.status(200).send({
            username: req.session.user.username
        })
    } 
    return res.status(204).send({
        message: 'Not Login'
    })
};

exports.logout = (req, res, next) => {
    req.session.destroy();
    return res.status(200).send({
        message: 'Logout Successfully'
    })
};
