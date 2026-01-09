import pkg from "pg";
const { Client } = pkg;

const database = new Client({
    user: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: "110088",
    port: process.env.DB_PORT,
});

try {
    await database.connect();
    console.log("Database Connected Successfully ✅.");
} catch (error) {
    console.error("Error connecting to the database ❌.", error);
    process.exit(1);
}

export default database;