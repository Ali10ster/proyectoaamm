const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// Función para insertar datos (INSERT)
async function insertData(req, res) {
  const data = req.query;
  const result = await db.query(
    `INSERT INTO coleccion (nombre, marca, tipo, precio)
     VALUES ('${data.nombre}', '${data.marca}', '${data.tipo}', '${data.precio}')`
  );
  return result.affectedRows;
}

// Función para seleccionar datos (SELECT)
async function getData(req, res) {
  const rows = await db.query(
    `SELECT *
     FROM coleccion`
  );
  const data = helper.emptyOrRows(rows); // Helper devuelve un array vacío si la consulta no devuelve nada
  return {
    data
  };
}

// Función para borrar datos (DELETE)
async function deleteData(req, res) {
  const data = req.query;
  const result = await db.query(
    `DELETE
     FROM coleccion
     WHERE id = '${data.id}'`
  );
  return result.affectedRows;
}

// Exporto la función getUserData para poder usarla en otro fichero
module.exports = {
  insertData,
  getData,
  deleteData
};