const { STATUS_CODES } = require('../utils/constants');
const movieModel = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  console.log('УТОПИя');
  console.log(req.params._id);
  console.log('love');
  console.log(req.user._id);
  movieModel
    .find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    })
    // вернём записанные в базу данные
    .then((movie) => res.status(STATUS_CODES.OK).send(movie))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Возникла ошибка ${err.message}`));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  console.log(req.params);
  console.log(req.user._id);
  movieModel
    .findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Нет фильма с указанным id'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нет прав на удаление фильма'));
      }
      return movie.deleteOne().then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении фильма'));
      }
      return next(err);
    });
};

module.exports = {
  createMovies,
  getMovies,
  deleteMovie,
};
