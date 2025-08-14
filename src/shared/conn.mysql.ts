import mysql from 'mysql2/promise'

export const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'fundacion',
    password: process.env.DB_PASSWORD || 'fundacion123', 
    database:process.env.DB_NAME || 'fundacion',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})