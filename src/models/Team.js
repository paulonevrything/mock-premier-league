const { Schema, model } = require('../config/database');
const { Types } = Schema;

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        //text: true
    },
    teamCode: {
        type: String,
        required: true,
        unique: true,
       // text: true
    },
    matchPlayed: Number,
    points: Number,
    fixtures: [{}]
},
    { timestamps: true });

teamSchema.index({ teamName: 'text', teamCode: 'text' })
console.log(teamSchema.indexes());
if (!teamSchema.indexes()) {
    teamSchema.index({ '$**': 'text' });
    console.log(teamSchema.indexes());
}
const Team = model('Team', teamSchema);

module.exports = Team;