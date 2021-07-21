const categoryRouter = require("express").Router();
const {
  getAllPictures,
  getOnePictureById,
  createOnePicture,
  updateOnePicture,
  deleteOnePicture,
} = require("../controllers/picture.controller");

categoryRouter.get("/", getAllPictures);
categoryRouter.get("/:id", getOnePictureById);
categoryRouter.post("/", createOnePicture, getOnePictureById);
categoryRouter.put("/:id", updateOnePicture, getOnePictureById);
categoryRouter.delete("/:id", deleteOnePicture);

module.exports = categoryRouter;
