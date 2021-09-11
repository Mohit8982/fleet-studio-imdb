const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    genre_name: { type: String, unique: true, required: true },
    isActive: { type: Boolean, default : true },
},
{ timestamps: true });


module.exports = mongoose.model('genre', schema);