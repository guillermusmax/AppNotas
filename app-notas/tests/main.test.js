const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

// Conectar a la base de datos antes de todas las pruebas
beforeAll(async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Desconectar de la base de datos después de todas las pruebas
afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
});

// Pruebas para los puntos finales de la API

describe('GET /', () => {
  // Probamos que obtenga la página de vista
  it('should return the view page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(302); // Cambiar a 200 si se espera que retorne 200
  });
});

describe('POST /api/note', () => {
  // Probamos que pueda crear una nueva nota
  it('should create a new note', async () => {
    const res = await request(app).post('/api/note').send({
      title: 'Test Title',
      description: 'Test Description',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.note).toHaveProperty('title');
    expect(res.body.note).toHaveProperty('description');
  });
});

describe('GET /api/note', () => {
  // Probamos que pueda obtener todas las notas
  it('should return all notes', async () => {
    const res = await request(app).get('/api/note');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});

describe('GET /api/note/:id', () => {
  // Probamos que pueda obtener una nota por su ID
  it('should return a note by id', async () => {
    const res = await request(app).get('/api/note');
    expect(res.statusCode).toBe(200);
    // Elegimos el ID de cualquier nota
    const id = res.body[0]._id;
    const res2 = await request(app).get(`/api/note/${id}`);
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveProperty('title');
    expect(res2.body).toHaveProperty('description');
  });
});

describe('PUT /api/note/:id', () => {
  // Probamos que pueda actualizar una nota por su ID
  it('should update a note by id', async () => {
    const res = await request(app).get('/api/note');
    expect(res.statusCode).toBe(200);
    // Elegimos el ID de cualquier nota
    const {_id, title, description} = res.body[0];
    // Generamos un título aleatorio
    const newTitle = Math.random().toString(36).substring(7);
    const res2 = await request(app)
        .put(`/api/note/${_id}`)
        .send({title: newTitle, description});
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveProperty('title');
    expect(res2.body.title).toBe(newTitle);
  });
});

describe('DELETE /api/note/:id', () => {
  // Probamos que pueda eliminar una nota por su ID
  it('should delete a note by id', async () => {
    const res = await request(app).get('/api/note');
    expect(res.statusCode).toBe(200);
    // Elegimos el ID de cualquier nota
    const id = res.body[0]._id;
    const res2 = await request(app).delete(`/api/note/${id}`);
    expect(res2.statusCode).toBe(200);
  });
});

