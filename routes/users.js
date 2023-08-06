const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const { updateUserJoi } = require('../middlewares/validation');

usersRouter.get('/me', usersController.findCurrentUser);
usersRouter.patch('/me', updateUserJoi, usersController.renewUser);

module.exports = usersRouter;
