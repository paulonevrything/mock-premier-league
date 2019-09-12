const { Schema, model } = require('../config/database');
const { ObjectId } = Schema;

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    teamCode: {
        type: String,
        required: true
    },
    matchPlayed: Number,
    points: Number
},
    { timestamps: true });

const Team = model('Team', teamSchema);

module.exports = Team;