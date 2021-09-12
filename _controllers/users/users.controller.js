const router = require('express').Router();
const { user_Validation, validate } = require('../../_helpers/validation');
const user_service = require('./users.service');
const public_service = require('./public_user.service');
const { verify_request } = require('../../_middleware/authorize');

//private api routes
router.post('/register-user', user_Validation(), validate, user_service.register);
router.post('/login-user', user_Validation(), validate, user_service.login);
router.post('/update-intrest', verify_request, user_service.set_genre);
router.post('/get-recomended-movie', verify_request, user_service.getRecommendedMovie);


//public api routes
router.post('/search-movie', public_service.get_movie_guggestion);
router.post('/sort-movie', public_service.sort_movie);


module.exports = router