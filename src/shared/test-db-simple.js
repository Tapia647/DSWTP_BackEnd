import mysql from 'mysql2/promise';

async function testConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 4000,
    user: 'fundacion',
    password: 'fundacion123',
    database: 'fundacion'
  });

  try {
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('✅ Conexión exitosa:', rows);
  } catch (err) {
    console.error('❌ Error al conectar:', err);
  } finally {
    await connection.end();
  }
}

testConnection();
