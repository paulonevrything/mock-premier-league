const { Schema, model } = require('../config/database');
const { ObjectId } = Schema;

const fixturesSchema = new Schema({
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    matchDate: {
        type: Date,
        required: true
    },
    scoreLine: [0, 0],
    uniqueURL: {
        type: String,
        required: true,
        unique: true
    },
    status: String
},
    { timestamps: true });

const Fixtures = model('Fixtures', fixturesSchema);

module.exports = Fixtures;