

const initializeEndPoints = (app) => {
    app.use('/api-user', require('./users/users.controller'));
    app.use('/api-movies', require('./movies/movies.controller'));
    app.use('/api-genre', require('./genre/genre.controller'));
}

module.exports = initializeEndPoints;