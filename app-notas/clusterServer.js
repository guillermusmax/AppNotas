// Han de configurar este archivo para correr en modo cluster
// con 4 procesos o más.
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configura Express y tus rutas aquí
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define tus rutas y lógica de la aplicación aquí
app.get('/', (req, res) => {
  res.send('¡Bienvenido a tu aplicación de notas!');
});

// Conéctate a tu base de datos MongoDB usando mongoose
mongoose.connect('mongodb://localhost:27017/notes-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = app.listen(8000, () => {
  console.log(`Servidor de notas iniciado en el puerto 8000`);
});

