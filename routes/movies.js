const router = require('express').Router();
const moviesController = require('../controllers/movie');
const { createMovieJoi, checkMovieIdJoi } = require('../middlewares/validation');

router.get('/', moviesController.getMovies);

router.post('/', createMovieJoi, moviesController.createMovies);

router.delete('/:_id', checkMovieIdJoi, moviesController.deleteMovie);

module.exports = router;
