import { poolFlowers, poolUsers } from './conn.js';

// Obtener todos los posts
export async function getAllPosts() {
    const connection = await poolFlowers.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM flowersblog_posts');
        return rows;
    } finally {
        connection.release();
    }
}

// Crear un nuevo post con `image_url`
export async function createPost(flower_name, color, season, image_url) {
    const connection = await poolFlowers.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO flowersblog_posts (flower_name, color, season, image_url) VALUES (?, ?, ?, ?)',
            [flower_name, color, season, image_url]
        );
        return result;
    } finally {
        connection.release();
    }
}

// Actualizar un post por `id` con `image_url`
export async function updatePostById(id, flower_name, color, season, image_url) {
    const connection = await poolFlowers.getConnection();
    try {
        await connection.query(
            'UPDATE flowersblog_posts SET flower_name = ?, color = ?, season = ?, image_url = ? WHERE id = ?',
            [flower_name, color, season, image_url, id]
        );
    } finally {
        connection.release();
    }
}

// Eliminar un post por `id`
export async function deletePostById(id) {
    const connection = await poolFlowers.getConnection();
    try {
        await connection.query('DELETE FROM flowersblog_posts WHERE id = ?', [id]);
    } finally {
        connection.release();
    }
}

// Obtener todos los usuarios
export async function getAllUsers() {
    const connection = await poolUsers.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM users');
        return rows;
    } finally {
        connection.release();
    }
}

// Crear un nuevo usuario
export async function createUser(username, password) {
    const connection = await poolUsers.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password]
        );
        return result;
    } finally {
        connection.release();
    }
}

// Obtener un usuario por nombre de usuario
export async function getUserByUsername(username) {
    const connection = await poolUsers.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return rows.length ? rows[0] : null;
    } finally {
        connection.release();
    }
}
