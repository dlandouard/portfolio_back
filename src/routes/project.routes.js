const projectRouter = require("express").Router();
const {
  getAllProjects,
  getAllProjectsWithImgs,
  getOneProjectById,
  getOneProjectWithImgById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
} = require("../controllers/project.controller");

projectRouter.get("/", getAllProjects);
projectRouter.get("/withImgs", getAllProjectsWithImgs);
projectRouter.get("/:id", getOneProjectWithImgById);
projectRouter.post("/", createOneProject, getOneProjectById);
projectRouter.put("/:id", updateOneProject, getOneProjectById);
projectRouter.delete("/:id", deleteOneProject);

module.exports = projectRouter;
