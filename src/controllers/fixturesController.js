const Fixtures = require('../models/Fixtures');
const utils = require('../utils');
const client = require('../config/index').redisClient;


module.exports = {
    createFixtures: async function (req, res, next) {
        if (!req.body) {
            return res.status(400).send({
                message: 'Request body is missing',
                success: false
            });
        }

        let fieldIsValid = utils.validateReqFields(req, res, ['homeTeam', 'awayTeam', 'matchDate', 'uniqueURL']);
        if (fieldIsValid) {
            let fixturesExist = await Fixtures.findOne({
                uniqueURL: req.body.uniqueURL
            });
            if (fixturesExist) {
                return res.status(409).json({ message: 'Fixtures already exists', success: false });
            }
            let fixtures = Fixtures(req.body);
            fixtures.save()
                .then((result) => {
                    if (!result || result.length === 0) {
                        utils.writeToFile(err);
                        return res.status(500).json({
                            message: 'An error has occurred',
                            success: false
                        })
                    }
                    res.status(201).json({
                        message: 'Fixtures successfully added',
                        success: true
                    })
                }).catch((err) => {
                    utils.writeToFile(err);
                    console.log(err);
                    return res.status(500).json({
                        message: 'An error has occurred',
                        success: false
                    })
                });
        }
    },
    getFixtures: function (req, res, next) {
        if (req.params) {
            // check redis for cache
            client.get(req.originalUrl, function (err, fixtures) {
                if (err) {
                    utils.writeToFile(err);
                }
                if (fixtures) {
                    res.status(201).json({
                        message: JSON.parse(fixtures),
                        success: true
                    });
                }
                else {
                    Fixtures.find()
                        .then(fixtures => {

                            // set redis
                            client.set(req.originalUrl, JSON.stringify(fixtures), function (err) {
                                utils.writeToFile(err);
                            });

                            res.status(201).json({
                                message: fixtures,
                                success: true
                            });
                        })
                        .catch(err => {
                            utils.writeToFile(err);
                            res.status(500).json({
                                message: 'An error has occurred',
                                success: false
                            });
                        });
                }
            });
        }
    },
    getCompletedFixtures: function (req, res, next) {
        if (req.params) {
            // check redis for cache
            client.get(req.originalUrl, function (err, fixtures) {
                if (err) {
                    utils.writeToFile(err);
                }
                if (fixtures) {
                    res.status(201).json({
                        message: JSON.parse(fixtures),
                        success: true
                    });
                }
                else {
                    Fixtures.find({
                        status: "completed"
                    })
                        .then(fixtures => {

                            // set redis
                            client.set(req.originalUrl, JSON.stringify(fixtures), function (err) {
                                utils.writeToFile(err);
                            });

                            res.status(201).json({
                                message: fixtures,
                                success: true
                            });
                        })
                        .catch(err => {
                            utils.writeToFile(err);
                            res.status(500).json({
                                message: 'An error has occurred',
                                success: false
                            });
                        });
                }
            });
        }
    },
    getPendingFixtures: function (req, res, next) {
        if (req.params) {

            // check redis for cache
            client.get(req.originalUrl, function (err, fixtures) {
                if (err) {
                    utils.writeToFile(err);
                }
                if (fixtures) {
                    res.status(201).json({
                        message: JSON.parse(fixtures),
                        success: true
                    });
                }
                else {
                    Fixtures.find({
                        status: "pending"
                    })
                        .then(fixtures => {

                            // set redis
                            client.set(req.originalUrl, JSON.stringify(fixtures), function (err) {
                                utils.writeToFile(err);
                            });

                            res.status(201).json({
                                message: fixtures,
                                success: true
                            });
                        })
                        .catch(err => {
                            utils.writeToFile(err);
                            res.status(500).json({
                                message: 'An error has occurred',
                                success: false
                            });
                        });
                }
            });
        }
    },
    editFixtures: function (req, res, next) {
        if (!req.body || !req.query.uniqueURL) {
            return res.status(400).send({
                message: 'Request body or url parameter is missing',
                success: false
            });
        }
        Fixtures.findOneAndUpdate({
            uniqueURL: req.query.uniqueURL
        }, req.body, {
            new: true
        })
            .then(fixtures => {
                if (!fixtures) {
                    res.status(201).json({
                        message: 'Fixtures not found',
                        success: true
                    });
                }
                res.status(201).json({
                    editedFixtures: fixtures,
                    message: 'Fixtures successfully edited',
                    success: true
                });
            })
            .catch(err => {
                utils.writeToFile(err);
                res.status(500).json({
                    message: 'An error has occurred',
                    success: false
                });
            });
    },
    deleteFixtures: function (req, res, next) {
        if (req.params) {
            let uniqueURL = req.params.uniqueURL;
            Fixtures.findOneAndDelete({
                uniqueURL: uniqueURL
            })
                .then(fixtures => {
                    if (!fixtures) {
                        res.status(201).json({
                            message: 'Fixtures not found',
                            success: true
                        });
                    }
                    res.status(201).json({
                        deletedFixtures: fixtures,
                        message: 'Fixtures successfully deleted',
                        success: true
                    });
                })
                .catch(err => {
                    utils.writeToFile(err);
                    res.status(500).json({
                        message: 'An error has occurred',
                        success: false
                    });
                });
        }
    }
}