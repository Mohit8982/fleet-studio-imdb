const mongoose = require('mongoose');
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGODB_URI, connectionOptions, (err, succ) => {
	if (err) {
		console.log(err);
	} else {
		console.log('DB Connected')
	}
});
mongoose.Promise = global.Promise;


module.exports = {
    User: require('../model/users.model'),
	Movies: require('../model/movies.model'),
	Genre: require('../model/genre.model'),
	Review: require('../model/movie_review.model')
};