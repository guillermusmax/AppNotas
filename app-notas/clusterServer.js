// Han de configurar este archivo para correr en modo cluster
// con 4 procesos o más.

require('dotenv').config();
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


// Función para crear un servidor HTTP
const createServer = () => {
  // Reemplaza "./app" con la ubicación real de tu aplicación
  const app = require('./app');
  return http.createServer(app);
};

if (cluster.isMaster) {
  // Este es el proceso maestro, crea los trabajadores

  console.log(`Master ${process.pid} is running`);

  // Fork workers para cada núcleo de CPU disponible
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Este es un proceso trabajador, inicia un servidor HTTP
  const server = createServer();
  // const port = process.env.PORT || 3000;
  const port = 8000 + cluster.worker.id; // Para probar que el factor 7
  createServer(port);

  server.listen(port, () => {
    console.log(`Worker ${process.pid} started and listening on port ${port}`);
  });
}
