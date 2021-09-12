const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    movie_name : { type: String, required: true },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true
    },
    genre_name : { type: String, required: true },
    genre_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "genre",
        required: true
    }
},
{ versionKey : false });

module.exports = mongoose.model('search_movie', schema);