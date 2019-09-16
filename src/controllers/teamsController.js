const Team = require('../models/Team');
const utils = require('../utils');
const client = require('../config/index').redisClient;


module.exports = {
    createTeam: async function (req, res, next) {
        if (!req.body) {
            return res.status(400).send({
                message: 'Request body is missing',
                success: false
            });
        }

        let fieldIsValid = utils.validateReqFields(req, res, ['teamName', 'matchPlayed', 'points', 'teamCode']);
        if (fieldIsValid) {
            let teamExist = await Team.findOne({
                teamCode: req.body.teamCode
            });
            if (teamExist) {
                return res.status(409).json({ message: 'Team already exists', success: false });
            }
            let team = Team(req.body);
            team.save()
                .then((result) => {
                    if (!result || result.length === 0) {
                        utils.writeToFile(err);
                        return res.status(500).json({
                            message: 'An error has occurred',
                            success: false
                        })
                    }
                    res.status(201).json({
                        message: 'Team successfully created',
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
    getTeams: function (req, res, next) {
        if (req.params) {
            // check redis for cached result
            client.get(req.originalUrl, function (err, teams) {
                if (err) {
                    utils.writeToFile(err);
                }
                if (teams) {
                    res.status(201).json({
                        message: JSON.parse(teams),
                        success: true
                    });
                }
                else {
                    Team.find()
                        .then(team => {
                            // set redis
                            client.set(req.originalUrl, JSON.stringify(team), function (err) {
                                utils.writeToFile(err);
                            });
                            res.status(201).json({
                                message: team,
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
    getTeam: function (req, res, next) {
        if (req.params) {

            let teamCode = req.params.teamCode;

            // check redis for cached result
            client.get(req.originalUrl, function (err, team) {
                if (err) {
                    utils.writeToFile(err);
                }
                if (team) {
                    res.status(201).json({
                        message: JSON.parse(team),
                        success: true
                    });
                }
                else {
                    Team.findOne({
                        teamCode: teamCode
                    })
                        .then(team => {
                            // set redis
                            client.set(req.originalUrl, JSON.stringify(team), function (err) {
                                utils.writeToFile(err);
                            });
                            res.status(201).json({
                                message: team,
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
    editTeam: function (req, res, next) {
        if (!req.body || !req.query.teamCode) {
            return res.status(400).send({
                message: 'Request body or url parameter is missing',
                success: false
            });
        }
        Team.findOneAndUpdate({
            teamCode: req.query.teamCode
        }, req.body, {
            new: true
        })
            .then(team => {
                if (!team) {
                    res.status(201).json({
                        message: 'Team not found',
                        success: true
                    });
                }
                res.status(201).json({
                    editedTeam: team,
                    message: 'Team successfully edited',
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
    deleteTeam: function (req, res, next) {
        if (req.params) {
            let teamCode = req.params.teamCode;
            Team.findOneAndDelete({
                teamCode: teamCode
            })
                .then(team => {
                    if (!team) {
                        res.status(201).json({
                            message: 'Team not found',
                            success: true
                        });
                    }
                    res.status(201).json({
                        deletedTeam: team,
                        message: 'Team successfully deleted',
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
    },
    searchTeam: function (req, res, next) {
        if (!req.query.search) {
            return res.status(400).send({
                message: 'search value is missing',
                success: false
            });
        }

        let searchParams = req.query.search;
        Team.find({
            $text: { $search : searchParams } //{ $search : searchParams }  status: new RegExp(searchParams, 'i')
        })
        .then(fixtures => {
            if (!fixtures) {
                res.status(201).json({
                    message: 'Fixtures not found',
                    success: true
                });
            }
            res.status(201).json({
                searchResults: fixtures,
                message: 'search completed successfully',
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