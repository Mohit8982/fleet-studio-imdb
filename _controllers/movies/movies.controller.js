const router = require('express').Router();
const { movie_Validation, validate } = require('../../_helpers/validation');
const { verify_request } = require('../../_middleware/authorize');
const movie_service = require('./movies.service');

router.post('/create-movie', verify_request, movie_Validation(), validate, movie_service.insert_movie);
router.post('/vote-movie', verify_request, movie_service.rate_movie);
router.post('/get-movie-details', verify_request, movie_service.movie_details);

module.exports = router;