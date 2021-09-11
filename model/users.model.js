const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    fav_genre : { type : Array }
},
{ timestamps: true });


module.exports = mongoose.model('users', schema);