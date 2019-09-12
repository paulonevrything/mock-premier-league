const fs = require('fs');
const path = require('path');
const Team = require('../models/Team');

module.exports = {
    generateToken: function (tokenLength) {
        let nums = '1234567890';
        let token = '';
        for (let i = 0; i < tokenLength; i++) {
            token += nums.charAt(Math.floor(Math.random() * nums.length));
        }
        return token;
    },
    writeToFile: function (error) {
        console.log('Error => ', error);
        let errorFile = path.join(__dirname, '../errors.log');
        fs.appendFile(errorFile,
            `\n\n${new Date().toDateString()} ${new Date().toTimeString()} => ${error} `,
            (err) => {
                if (err) {
                    console.log('Error writing to file => ', err);
                }
            })
    },
    validateReqFields: function (req, res, requiredFields) {
        for (let field of requiredFields) {
            if (!req.body[field]) {
                (() => res.status(400).send({ success: false, message: `You have to provide your ${field}` }))();
                return false;
            }
        }
        return true;
    },
    validateEmail: function (email) {
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    },
    writeToFile : function(error){
        console.log('Error => ',error);
        let errorFile = path.join(__dirname,'../errors.log');
        fs.appendFile(errorFile,
        `\n\n${new Date().toDateString()} ${new Date().toTimeString()} => ${error} `,
        (err) => {
            if(err){
                console.log('Error writing to file => ',err);
            }
        })
    }
}