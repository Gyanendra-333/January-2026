import database from "../database/db.js";

export async function createShippingInfoTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS shipping_info (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                address TEXT NOT NULL,
                city VARCHAR(100) NOT NULL,
                state VARCHAR(100) NOT NULL,
                zip_code VARCHAR(20) NOT NULL,
                country VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                foreign key (order_id) references orders(id) on delete cascade
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error('Error creating shipping info table:', error);
        process.exit(1);
    }
}