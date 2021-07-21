const mainRouter = require('express').Router();
const projectRoutes = require('./project.routes');
const pictureRoutes = require('./picture.routes');

mainRouter.use('/project', projectRoutes);
mainRouter.use('/picture', pictureRoutes);

module.exports = mainRouter;
