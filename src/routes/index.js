const mainRouter = require('express').Router();
const projectRoutes = require('./project.routes');
const pictureRoutes = require('./picture.routes');
const userRoutes = require('./user.routes');
const adminRoutes = require('./administrates.routes');

mainRouter.use('/project', projectRoutes);
mainRouter.use('/picture', pictureRoutes);
mainRouter.use('/user', userRoutes);
mainRouter.use('/administrates', adminRoutes);

module.exports = mainRouter;
