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


if (!fixturesSchema.indexes()) {
    fixturesSchema.index({ '$**': 'text' });
    console.log(fixturesSchema.indexes());
}

const Fixtures = model('Fixtures', fixturesSchema);

module.exports = Fixtures;