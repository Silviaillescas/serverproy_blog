// create_user.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function createUser(username, plainPassword) {
    // Conexión a la base de datos
    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        user: "silviai",
        password: "Silvia#Ingenieria12",
        database: "users_db",
    });

    // Cifra la contraseña usando bcrypt
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Inserta el usuario en la base de datos
    const [result] = await connection.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
    );

    console.log('Usuario creado con ID:', result.insertId);

    // Cierra la conexión a la base de datos
    await connection.end();
}

// Llama a la función para crear el usuario
createUser('silvia', 'password').catch(console.error);
