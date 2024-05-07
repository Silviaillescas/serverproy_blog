import pool from './conn.js';

async function main() {
    let connection;
    try {
        // Obtener todos los posts
        connection = await pool.getConnection();
        const [posts] = await connection.execute("SELECT * FROM flowersblog_posts");
        console.log("Lista de posts:");
        console.log(posts);

        // Obtener todos los usuarios
        const [users] = await connection.execute("SELECT * FROM users");
        console.log("\nLista de usuarios:");
        console.log(users);

        // Liberar la conexión después de ejecutar ambas consultas
        connection.release();
    } catch (error) {
        console.error('Error:', error);
        if (connection) {
            connection.release(); // Asegura liberar la conexión incluso en caso de error
        }
    }
}

main();
