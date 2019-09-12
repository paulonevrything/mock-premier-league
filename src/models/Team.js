const { Schema, model } = require('../config/database');
const { Types } = Schema;

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    teamCode: {
        type: String,
        required: true,
        unique: true
    },
    matchPlayed: Number,
    points: Number,
    fixtures: [{}]
},
    { timestamps: true });

const Team = model('Team', teamSchema);

module.exports = Team;