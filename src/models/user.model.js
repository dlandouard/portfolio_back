const argon2 = require('argon2');
const connection = require('../db-connection');

const userAlreadyExists = async (userName) => {
  const sql = 'SELECT * FROM user WHERE userName=?';
  const [results] = await connection.promise().query(sql, [userName]);
  return results.length > 0;
};

const hashPassword = (password) => {
  return argon2.hash(password);
};

const verifyPassword = (password, hashedPasword) => {
  return argon2.verify(hashedPasword, password);
};

const findMany = () => {
  const sql = 'SELECT * FROM user';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM user WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findOneByUserName = (userName) => {
  const sql = 'SELECT * FROM users WHERE userName=?';
  return connection.promise().query(sql, [userName]);
};

const createOne = (user) => {
  const sql = 'INSERT INTO user SET ?';
  return connection.promise().query(sql, [user]);
};

const updateOne = (user, id) => {
  const sql = 'UPDATE user SET ? WHERE id=?';
  return connection.promise().query(sql, [user, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM user WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  userAlreadyExists,
  hashPassword,
  verifyPassword,
  findMany,
  findOneById,
  findOneByUserName,
  createOne,
  updateOne,
  deleteOne,
};
