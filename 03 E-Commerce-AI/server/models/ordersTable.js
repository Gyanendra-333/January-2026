import database from "../database/db.js";

export async function createOrdersTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                buyer_id INT REFERENCES users(id) ON DELETE CASCADE,
                total_amount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                foreign key (buyer_id) references users(id) on delete cascade
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error('Error creating orders table:', error);
        process.exit(1);
    }
}