const projectRouter = require("express").Router();
const {
  getAllProjects,
  getOneProjectById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
} = require("../controllers/project.controller");

projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getOneProjectById);
projectRouter.post("/", createOneProject, getOneProjectById);
projectRouter.put("/:id", updateOneProject, getOneProjectById);
projectRouter.delete("/:id", deleteOneProject);

module.exports = projectRouter;
