const router = require('express').Router();
const { genre_Validation, validate } = require('../../_helpers/validation');
const genre_service = require('./genre.service');


router.post('/create-genre', genre_Validation(), validate, genre_service.create_genre );

module.exports = router;