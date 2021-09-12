const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    movie_name: { type: String, required: true },
    movie_details : { type: String, required: true },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        //ref: "users",
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "genre",
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    up_votes:  { type: Number, default: false },
    down_votes: { type: Number, default: false },
    movie_poster: {
        type: String,
        required: false
    }
},
{ timestamps: true });

module.exports = mongoose.model('movies', schema);