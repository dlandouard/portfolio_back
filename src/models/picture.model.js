const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM picture';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM picture WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (picture) => {
  const sql = 'INSERT INTO picture SET ?';
  return connection.promise().query(sql, [picture]);
};

const updateOne = (picture, id) => {
  const sql = 'UPDATE picture SET ? WHERE id=?';
  return connection.promise().query(sql, [picture, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM picture WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findPicturesPerProjectId = (id) => {
  const sql = 'SELECT p.id, pic.* FROM picture pic JOIN project p ON p.id=pic.project_id WHERE p.id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findPicturesPerProjectId,
};
