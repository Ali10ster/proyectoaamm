
// Importo el express y el cors
const express = require("express");
const cors = require("cors");
// Importo el fichero login.js que está en la carpeta services
const login = require("./services/login");
const item = require("./services/items");

// Definimos el puerto por que va a escuchar nuestra API las peticiones
const port = 3030;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());


// Ejemplo para ver cómo funciona un endpoint:
// este endpoint / y devuelve un mensaje
app.get("/", function(req, res) {
  res.json({ message: "Hola Mundo!" });
});

// Creación del endpoint: /login
// llama al fichero login.js usando la función getUserData pasándole
// el login (user) y la contraseña (password)
app.get("/login", async function(req, res, next) {
  console.log(req.query);
  console.log(req.query.user);
  console.log(req.query.password);
  try {
    res.json(await login.getUserData(req.query.user, req.query.password));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

// Creación del endpoint: /addItem
app.get("/addItem", async function(req, res, next) {
  console.log(req.query);
  try {
    res.json(await item.insertData(req));
  } catch (err) {
    console.error(`Error while inserting items`, err.message);
    next(err);
  }
});

// Creación del endpoint: /getItems
app.get("/getItems", async function(req, res, next) {
  try {
    res.json(await item.getData(req));
  } catch (err) {
    console.error(`Error while getting items`, err.message);
    next(err);
  }
});

// Creación del endpoint: /deleteItem
app.get("/deleteItem", async function(req, res, next) {
  try {
    res.json(await item.deleteData(req))
  } catch (err) {
    console.error(`Error while deleting item`, err.message);
    next(err);
  }
});

// Iniciamos la API
app.listen(port);
console.log("API escuchando en el puerto " + port);
