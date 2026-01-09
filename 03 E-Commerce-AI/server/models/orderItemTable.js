import database from "../database/db.js";

export async function createOrdersItemTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INT REFERENCES orders(id) ON DELETE CASCADE,
                product_id INT REFERENCES products(id) ON DELETE CASCADE,
                total_amount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(20),
                image TEXT NOT NULL,
                title VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                quantity INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                foreign key (order_id) references orders(id) on delete cascade,
                foreign key (product_id) references products(id) on delete cascade
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error('Error creating orders table:', error);
        process.exit(1);
    }
}