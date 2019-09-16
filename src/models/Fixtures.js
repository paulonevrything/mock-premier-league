const { Schema, model } = require('../config/database');
const { ObjectId } = Schema;

const fixturesSchema = new Schema({
    homeTeam: {
        type: String,
        required: true,
        text: true
    },
    awayTeam: {
        type: String,
        required: true,
        text: true
    },
    matchDate: {
        type: Date,
        required: true,
        text: true
    },
    scoreLine: [0, 0],
    uniqueURL: {
        type: String,
        text: true
    },
    fixturesID: {
        type: String,
        required: true,
        unique: true,
        text: true
    },
    status: {
        type: String,
        text: true
    }
},
    { timestamps: true });


fixturesSchema.index({
    homeTeam: 'text',
    awayTeam: 'text',
    matchDate: 'text',
    fixturesID: 'text',
    status: 'text',
    uniqueURL: 'text'
})

const Fixtures = model('Fixtures', fixturesSchema);

module.exports = Fixtures;