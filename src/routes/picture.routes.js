const pictureRouter = require("express").Router();
const {
  getAllPictures,
  getOnePictureById,
  createOnePicture,
  updateOnePicture,
  deleteOnePicture,
} = require("../controllers/picture.controller");

pictureRouter.get("/", getAllPictures);
pictureRouter.get("/:id", getOnePictureById);
pictureRouter.post("/", createOnePicture, getOnePictureById);
pictureRouter.put("/:id", updateOnePicture, getOnePictureById);
pictureRouter.delete("/:id", deleteOnePicture);

module.exports = pictureRouter;
