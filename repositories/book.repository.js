import { connect } from "./db.js";

async function insertBook(book) {
    const conn = await connect();
    try {
        const sql = "INSERT INTO books (name, value, stock, author_id) VALUES ($1, $2, $3, $4) RETURNING *"
        const values = [book.name, book.value, book.stock, book.author_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getBooks() {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM books");
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getBook(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM books WHERE book_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteBook(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM books WHERE book_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateBook(book) {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE books " +
            "   SET name = $1, description = $2, value = $3, stock = $4, supplier_id = $5 " +
            " WHERE book_id = $6 RETURNING *";
        const values = [book.name, book.description, book.value, book.stock, book.supplier_id, book.book_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}
