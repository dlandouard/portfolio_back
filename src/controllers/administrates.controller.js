const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/administrates.model');

const getAllUserProjectJoins = (req, res) => {
  findMany()
    .then((results) => {
      const userProjectJoin = results[0];
      res.json(userProjectJoin);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneUserProjectJoinById = (req, res) => {
  let id;
  if (req.userProjectJoinId) {
    id = req.userProjectJoinId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([UserProjectJoin]) => {
      if (UserProjectJoin.length === 0) {
        res.status(404).send('Jointure utilisateur_projet non trouvée');
      } else {
        res.json(UserProjectJoin[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneUserProjectJoin = (req, res, next) => {
  const { project_id, user_id } = req.body;
  const { error } = Joi.object({
    project_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
  }).validate({ project_id, user_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ project_id, user_id })
      .then(([results]) => {
        res.status(201);
        req.userId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneUserProjectJoin = (req, res, next) => {
  const { project_id, user_id  } = req.body;
  const { error } = Joi.object({
    project_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ project_id, user_id  }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Jointure utilisateur_projet non trouvée');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneUserProjectJoin = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Jointure utilisateur_projet non trouvée');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllUserProjectJoins,
  getOneUserProjectJoinById,
  createOneUserProjectJoin,
  updateOneUserProjectJoin,
  deleteOneUserProjectJoin,
};
