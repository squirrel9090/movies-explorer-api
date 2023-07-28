const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUserJoi, loginJoi } = require('../middlewares/validation');
const { createUser, loginUser } = require('../controllers/users');

router.post('/signup', createUserJoi, createUser);
router.post('/signin', loginJoi, loginUser);

router.use(auth);

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Запись не найдена')));

module.exports = router;
