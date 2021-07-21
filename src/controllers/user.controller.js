const Joi = require("joi");
const {
  userAlreadyExists,
  hashPassword,
  verifyPassword,
  findMany,
  findOneById,
  findOneByUserName,
  createOne,
  updateOne,
  deleteOne,
} = require("../models/user.model");

const getAllUsers = (req, res) => {
  findMany()
    .then((results) => {
      const user = results[0];
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneUserById = (req, res) => {
  let id;
  if (req.userId) {
    id = req.userId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([User]) => {
      if (User.length === 0) {
        res.status(404).send("Utilisateur non trouvé");
      } else {
        res.json(User[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneUser = async (req, res, next) => {
  const { userName, clearPassword, role } = req.body;
  const { error } = Joi.object({
    userName: Joi.string().max(100).required(),
    clearPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required(),
    role: Joi.string().max(100).required(),
  }).validate({ userName, clearPassword, role }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    const userIsExisting = await userAlreadyExists(userName);
    if (userIsExisting) {
      res.status(422).send('Cet utilisateur existe déjà');
    } else {
    const password = await hashPassword(clearPassword);
    createOne({ userName, password, role })
      .then(([results]) => {
        res.status(201);
        req.userId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
    }
  }
};

const updateOneUser = async (req, res, next) => {
  const { userName, password, role } = req.body;
  const { error } = Joi.object({
    userName: Joi.string().max(100),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')),
    role: Joi.string().max(100),
  })
    .min(1)
    .validate({ userName, password, role }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    const userIsExisting = await userAlreadyExists(userName);
    if (userIsExisting) {
      if (req.body.password) {
        req.body.password = await hashPassword(password);
      }
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send("Utilisateur non trouvé");
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
    } else {
      res.status(422).send('Cet utilisateur est utilisé, impossible de le renommer');
    }
  }
};

const deleteOneUser = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send("Utilisateur non trouvé");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const verifyCredentials = async (req, res, next) => {
  const { userName, password } = req.body;
  const [users] = await findOneByUserName(userName);
  if (!users[0]) {
    res.status(404).json('Utilisateur non trouvé');
  } else {
    const [user] = users;
    const passwordIsValid = await verifyPassword(password, user.user_password);
    if (passwordIsValid) {
      next();
    } else {
      res.status(401).send('Mot de passe erroné');
    }
  }
};

module.exports = {
  getAllUsers,
  getOneUserById,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  verifyCredentials,
};
