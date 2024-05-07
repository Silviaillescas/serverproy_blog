// conn.js
import mysql from 'mysql2/promise';

// Conexión a la base de datos "flowersblog"
const poolFlowers = mysql.createPool({
    host: "127.0.0.1",
    user: "silviai",
    password: "Silvia#Ingenieria12",
    database: "flowersblog",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Conexión a la base de datos "users_db"
const poolUsers = mysql.createPool({
    host: "127.0.0.1",
    user: "silviai",
    password: "Silvia#Ingenieria12",
    database: "users_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDatabaseConnection() {
    try {
        const connectionFlowers = await poolFlowers.getConnection();
        console.log('Conexión exitosa a la base de datos "flowersblog"');
        connectionFlowers.release();

        const connectionUsers = await poolUsers.getConnection();
        console.log('Conexión exitosa a la base de datos "users_db"');
        connectionUsers.release();
    } catch (error) {
        console.error('Error al conectar a una de las bases de datos:', error);
    }
}

testDatabaseConnection();

export { poolFlowers, poolUsers };
