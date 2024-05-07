import express from 'express';
import cors from 'cors';
import authRouter from '../auth.js'; 
import * as db from '../db.js'; 

const app = express();
app.use(cors());
app.use(express.json());

// Incluir el router de autenticación
app.use('/auth', authRouter);

// Endpoint para obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await db.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error obteniendo las publicaciones:', error.message || error);
        res.status(500).json({ error: 'Error obteniendo las publicaciones' });
    }
});

// Endpoint para crear un nuevo post
app.post('/posts', async (req, res) => {
    const { flower_name, color, season, image_url } = req.body;
    if (!flower_name || !color || !season || !image_url) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const result = await db.createPost(flower_name, color, season, image_url);
        res.status(201).json({ message: 'Publicación creada', id: result.insertId });
    } catch (error) {
        console.error('Error creando publicación:', error.message || error);
        res.status(500).json({ error: 'Error creando publicación' });
    }
});

// Actualizar un post por `id`
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { flower_name, color, season, image_url } = req.body;
    if (!flower_name || !color || !season || !image_url) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        await db.updatePostById(id, flower_name, color, season, image_url);
        res.json({ message: 'Publicación actualizada' });
    } catch (error) {
        console.error('Error actualizando publicación:', error.message || error);
        res.status(500).json({ error: 'Error actualizando publicación' });
    }
});

// Eliminar un post por `id`
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.deletePostById(id);
        res.json({ message: 'Publicación eliminada' });
    } catch (error) {
        console.error('Error eliminando publicación:', error.message || error);
        res.status(500).json({ error: 'Error eliminando publicación' });
    }
});

// Endpoint para obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error.message || error);
        res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
});

// Endpoint para crear un nuevo usuario
app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Hashear la contraseña antes de guardarla
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.createUser(username, hashedPassword);
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    } catch (error) {
        console.error('Error creando usuario:', error.message || error);
        res.status(500).json({ error: 'Error creando usuario' });
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
