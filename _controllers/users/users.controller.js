const router = require('express').Router();
const { user_Validation, validate } = require('../../_helpers/validation');
const user_service = require('./users.service');
const { verify_request } = require('../../_middleware/authorize');


router.post('/register-user', user_Validation(), validate, user_service.register);
router.post('/login-user', user_Validation(), validate, user_service.login);

router.post('/update-intrest', verify_request, user_service.set_genre);
router.post('/get-recomended', verify_request, user_service.getRecommendedMovie);

module.exports = router