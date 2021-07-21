const categoryRouter = require("express").Router();
const {
  getAllProjects,
  getOneProjectById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
} = require("../controllers/project.controller");

categoryRouter.get("/", getAllProjects);
categoryRouter.get("/:id", getOneProjectById);
categoryRouter.post("/", createOneProject, getOneProjectById);
categoryRouter.put("/:id", updateOneProject, getOneProjectById);
categoryRouter.delete("/:id", deleteOneProject);

module.exports = categoryRouter;
