import database from "../database/db.js";

export async function createProductTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                rating DECIMAL(2, 1) DEFAULT 0,
                stock INT DEFAULT 0,
                category VARCHAR(100),
                image JSONB DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error('Error creating product table:', error);
        process.exit(1);
    }
}