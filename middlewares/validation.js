const { celebrate, Joi } = require('celebrate');

const urlPattern = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;

const createUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
    name: Joi.string().min(2).max(30),
  }),
});

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
  }),
});

const getUserByIdJoi = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const createMovieJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(urlPattern).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().pattern(urlPattern).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().pattern(urlPattern).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const checkMovieIdJoi = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  createUserJoi,
  loginJoi,
  getUserByIdJoi,
  createMovieJoi,
  updateUserJoi,
  checkMovieIdJoi,
};
