import database from '../database/db.js';

export async function createUserTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(50) DEFAULT 'User' CHECK (role IN ('User', 'Admin')),
                avatar JSONB Default NULL ,
                resetPasswordToken TEXT DEFAULT NULL,
                resetPasswordExpire TIMESTAMP DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error('Error creating user table:', error);
        process.exit(1);
    }
}