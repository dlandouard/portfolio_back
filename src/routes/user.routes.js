const userRouter = require("express").Router();
const {
  getAllUsers,
  getOneUserById,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  verifyCredentials,
} = require("../controllers/user.controller");

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUserById);
userRouter.post("/", createOneUser, getOneUserById);
userRouter.post('/login', verifyCredentials);
userRouter.put("/:id", updateOneUser, getOneUserById);
userRouter.delete("/:id", deleteOneUser);

module.exports = userRouter;
