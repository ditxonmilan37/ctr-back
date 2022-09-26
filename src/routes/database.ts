import mysql from 'mysql2';

export async function connect() {
    const connection = await mysql.createPool({
        host: '68.183.49.196',
        user: 'admin',
        password: '@Entelgy2022',
        database: 'controltimereport',
        waitForConnections: true,
    })

    return connection;
}