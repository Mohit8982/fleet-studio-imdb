const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    review: {
        type: String,
        required: true,
        min: 10,
        max: 1000
    },
    reviewed_on: Date,
    up_vote: { type: Boolean, default: false },
    down_vote: { type: Boolean, default: false }
},
{ timestamps: true });



module.exports = mongoose.model('reviews', schema);