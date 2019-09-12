const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');
const util = require('../utils');

module.exports = {
    signUp: async function (model, req, res, next) {
        if (!req.body) {
            return res.status(400).send({ message: 'Request body is missing', success: false });
        }

        let requiredFieldsValid = util.validateReqFields(req, res, ['email', 'password', 'firstName', 'lastName']);

        if (requiredFieldsValid) {
            let { email, firstName, lastName, password } = req.body;
            let emailValid = util.validateEmail(email);
            if (emailValid) {
                let userWithEmail = await model.findOne({ email: email });
                if (userWithEmail) {
                    return res.status(409).json({ message: 'Email is already registered', success: false });
                }

                bcrypt.hash(password, config.BCRYPT_HASH_ROUNDS, (err, hash) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err, success: false });
                    } else {
                        let token = util.generateToken(4);
                        const user = new model({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: hash,
                            emailVerificationToken: token
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Account created successfully',
                                    success: true
                                })
                            });
                    }
                })

            }
            else {
                res.status(403).json({ message: 'Invalid email address', success: false });
            }
        }
    },
    signIn: function (model, loginReq, loginRes, next) {
        let requiredFieldsValid = util.validateReqFields(loginReq, loginRes, ['email', 'password']);
        if (requiredFieldsValid) {
            model.find({ email: loginReq.body.email })
                .exec()
                .then(users => {
                    if (users.length < 1) {
                        return loginRes.status(401).json({
                            message: 'Auth failed - user not found',
                            success: false
                        });
                    }
                    bcrypt.compare(loginReq.body.password, users[0].password, (err, res) => {
                        if (err) {
                            return loginRes.status(401).json({
                                message: 'Auth failed - internal server error',
                                success: false
                            })
                        }
                        if (res) {
                            const token = jwt.sign({
                                email: users[0].email,
                                userId: users[0]._id
                            }, config.JWT_SECRET);

                            return loginRes.status(200).json({
                                message: 'Auth successful',
                                success: true,
                                token: token
                            });
                        }
                        return loginRes.status(401).json({
                            message: 'Auth failed - incorrect password',
                            success: false
                        });
                    })
                })
        }
    }
}