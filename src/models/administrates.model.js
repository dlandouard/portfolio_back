const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM administrate';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM administrate WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (administrate) => {
  const sql = 'INSERT INTO administrate SET ?';
  return connection.promise().query(sql, [administrate]);
};

const updateOne = (administrate, id) => {
  const sql = 'UPDATE administrate SET ? WHERE id=?';
  return connection.promise().query(sql, [administrate, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM administrate WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
