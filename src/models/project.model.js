const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM project';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM project WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (project) => {
  const sql = 'INSERT INTO project SET ?';
  return connection.promise().query(sql, [project]);
};

const updateOne = (project, id) => {
  const sql = 'UPDATE project SET ? WHERE id=?';
  return connection.promise().query(sql, [project, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM project WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
