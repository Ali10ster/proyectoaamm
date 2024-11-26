const db = require('./db')
const helper = require('../helper')
const config = require('../config')

//Función con la consulta para insertar datos en la base de datos: INSERT
async function insertDataUsers (req, res) {
    //data tiene los datos que vamos a insertar en la base de datos. Los coge de req.query
    //Para acceder a cada uno de los datos: data.nombre, data.precio, ...
    const data = req.query
    const result = await db.query(`insert into usuarios (nombre, login, password, rol) values ( ?, ?, ?, ?)`, [data.nombre, data.login, data.password, data.rol])
    return result.affectedRows
}

//Función con la consulta de obtener datos de la base de datos: select * from usuarios
async function getDataUsers (req, res) {
    //La variable rows almacena los datos obtenidos de la consulta select.
    const rows = await db.query(
    `select * from usuarios`
    )
    /*Los datos obtenidos de la consulta del select los paso por la función helper para que
    en el caso de que no haya datos devueltos, me devuelva un array vacío. */
    const data = helper.emptyOrRows(rows)
    return {
    //Devolvemos el resultado del Select, que está almacenado en la variable data
    data
    }
    }
    //Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteDataUsers (req, res) {
    //En data almaceno los datos que me pasan para poder realizar el delete, me pasarán el id.
    const data = req.query
    const result = await db.query(
    `delete from usuarios where(id = ${data.id})`
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido borrado. Si ese número es mayor que cero es que ha habido borrado en la base de datos.*/
    return result.affectedRows
    }
    //Al final del fichero exporto las funciones getDataUsers, insertDataUsers y deleteDataUsers
    module.exports = {
    getDataUsers,
    insertDataUsers,
    deleteDataUsers
    }