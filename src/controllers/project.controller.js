const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/project.model');

const getAllProjects = (req, res) => {
  findMany()
    .then((results) => {
      const project = results[0];
      res.json(project);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneProjectById = (req, res) => {
  let id;
  if (req.projectId) {
    id = req.projectId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Project]) => {
      if (Project.length === 0) {
        res.status(404).send('Project not found');
      } else {
        res.json(Project[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneProject = (req, res, next) => {
  const { title, technology, description } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(100).required(),
    technology: Joi.string().max(100).required(),
    description: Joi.string().max(255).required(),
  }).validate({ title, technology, description }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ title, technology, description })
      .then(([results]) => {
        req.projectId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneProject = (req, res, next) => {
  const { title, technology, description } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(100),
    technology: Joi.string().max(100),
    description: Joi.string().max(255),
  })
    .min(1)
    .validate({ title, technology, description }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Project not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneProject = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Project not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllProjects,
  getOneProjectById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
};
