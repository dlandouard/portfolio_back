const multer = require('multer');
const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/picture.model');

const getAllPictures = (req, res) => {
  findMany()
    .then((results) => {
      const picture = results[0];
      res.json(picture);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOnePictureById = (req, res) => {
  let id;
  if (req.pictureId) {
    id = req.pictureId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Picture]) => {
      if (Picture.length === 0) {
        res.status(404).send('Image non trouvée');
      } else {
        res.json(Picture[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const uploadPicture = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/image');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage }).single('file');
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json('err');
    } else {
      const configuration = JSON.parse(req.body.configuration);
      req.itemAndImg = {
        title: req.file.filename,
        ...configuration,
      };
      next();
    }
  });
};

const createOnePicture = (req, res, next) => {
  const { title, alt, type, project_id } = req.itemAndImg;
  const { error } = Joi.object({
    title: Joi.string().max(255).required(),
    alt: Joi.string().max(255).required(),
    type: Joi.string().max(100).required(),
    project_id: Joi.number().integer(),
  }).validate({ title, alt, type, project_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ title, alt, type, project_id })
      .then(([results]) => {
        res.status(201);
        req.pictureId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOnePicture = (req, res, next) => {
  const { title, alt, type, project_id } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(255),
    alt: Joi.string().max(255),
    type: Joi.string().max(100),
    project_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ title, alt, type, project_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Image non trouvée');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOnePicture = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Image non trouvée');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllPictures,
  getOnePictureById,
  uploadPicture,
  createOnePicture,
  updateOnePicture,
  deleteOnePicture,
};
