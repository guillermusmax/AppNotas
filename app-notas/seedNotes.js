// Importa el modelo Notes y la configuración de MongoDB
require('dotenv').config();
const Notes = require('./database');
const mongoose = require('mongoose');


// Conecta a la base de datos MongoDB
mongoose
    .connect(process.env.MONGODB_URI,
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log('Conexión a MongoDB establecida.');

      // Crea datos de prueba y guárdalos en la base de datos
      const testData = [
        {
          title: 'Nota de prueba 1',
          description: 'Esta es la primera nota de prueba.',
        },
        {
          title: 'Nota de prueba 2',
          description: 'Esta es la segunda nota de prueba.',
        },
      ];

      Notes.insertMany(testData, (err, result) => {
        if (err) {
          console.error('Error al cargar datos de prueba:', err);
        } else {
          console.log('Datos de prueba cargados con éxito:', result);
        }

        // Cierra la conexión a la base de datos
        mongoose.connection.close();
      });
    })
    .catch((err) => {
      console.error('Error al conectar con MongoDB:', process.env.MONGODB_URI);
    });
