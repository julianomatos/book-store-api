import { connect } from "./db.js";

async function insertAuthor(author) {
    const conn = await connect();
    try {
        const sql = "INSERT INTO authors (name, email, phone) VALUES ($1, $2, $3) RETURNING *"
        const values = [author.name, author.email, author.phone];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getAuthors() {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM authors");
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getAuthor(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM authors WHERE author_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteAuthor(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM authors WHERE author_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateAuthor(author) {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE authors " +
            "   SET name = $1, password = $2, phone = $3, email = $4, address = $5 " +
            " WHERE author_id = $6 RETURNING *";
        const values = [author.name, author.password, author.phone, author.email, author.address, author.author_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
}
