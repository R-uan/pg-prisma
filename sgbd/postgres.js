import pkg from "pg";
const { Client } = pkg;

const db = new Client({
    host: "",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "",
});

db.connect();

/* const query = "SELECT * FROM categories";
 */

export { db };
