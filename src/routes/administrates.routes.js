const adminRouter = require("express").Router();
const {
  getAllUserProjectJoins,
  getOneUserProjectJoinById,
  createOneUserProjectJoin,
  updateOneUserProjectJoin,
  deleteOneUserProjectJoin,
} = require("../controllers/administrates.controller");

adminRouter.get("/", getAllUserProjectJoins);
adminRouter.get("/:id", getOneUserProjectJoinById);
adminRouter.post("/", createOneUserProjectJoin, getOneUserProjectJoinById);
adminRouter.put("/:id", updateOneUserProjectJoin, getOneUserProjectJoinById);
adminRouter.delete("/:id", deleteOneUserProjectJoin);

module.exports = adminRouter;
