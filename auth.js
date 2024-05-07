// auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByUsername } from './db.js'; 

const SECRET_KEY = 'mi_clave_secreta'; // Usa una clave segura

const router = express.Router();

router.post('/login', async (req, res) => {
    const { userName, passwordHash } = req.body;

    // Busca al usuario en la base de datos
    const user = await getUserByUsername(userName);
    if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Compara las contraseñas
    const isPasswordMatch = await bcrypt.compare(passwordHash, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Genera el token JWT
    const token = jwt.sign({ userId: user.id, userName: userName }, SECRET_KEY, {
        expiresIn: '2h' // Configura el tiempo de expiración del token
    });

    // Devuelve el token
    res.json({ token });
});

export default router;
