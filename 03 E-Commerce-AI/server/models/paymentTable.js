import database from "../database/db.js";

export async function createPaymentTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS payments (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                order_id INT REFERENCES orders(id) ON DELETE CASCADE,
                amount DECIMAL(10, 2) NOT NULL,
                currency VARCHAR(3) NOT NULL,
                payment_type VARCHAR(50),
                payment_status VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                foreign key (order_id) references orders(id) on delete cascade
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error('Error creating payment table:', error);
        process.exit(1);
    }
}