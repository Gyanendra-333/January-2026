import database from "../database/db.js";

export async function createProductReviewTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS product_reviews (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                product_id INT REFERENCES products(id) ON DELETE CASCADE,
                rating INT CHECK (rating >= 1 AND rating <= 5),
                review TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                foreign key (product_id) references products(id) on delete cascade,
                foreign key (user_id) references users(id) on delete cascade
            );
        `;
        await database.query(query);
    } catch (error) {
        console.error('Error creating product review table:', error);
        process.exit(1);
    }
}