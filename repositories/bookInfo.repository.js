import { getClient } from "./mongo.db.js";

async function createBookInfo(bookInfo) {
    const client = getClient();
    try {
        await client.connect();
        await client.db("bookStore").collection("bookInfo").insertOne(bookInfo);
    } catch (e) {
        throw e;
    } finally {
        await client.close();
    }
}

async function updateBookInfo(bookInfo) {
    const client = getClient();
    try {
        await client.connect();
        await client.db("bookStore").collection("bookInfo").updateOne(
            { bookId: bookInfo.bookId },
            { $set: { ...bookInfo } }
        );
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function getBookInfo(bookId) {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("bookStore").collection("bookInfo").findOne({ bookId });
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function createReview(review, bookId) {
    try {
        const bookInfo = await getBookInfo(bookId);
        bookInfo.reviews.push(review);
        await updateBookInfo(bookInfo);
    } catch (err) {
        throw err;
    }
}

async function deleteReview(bookId, index) {
    try {
        const bookInfo = await getBookInfo(bookId);
        bookInfo.reviews.splice(index, 1);
        await updateBookInfo(bookInfo);
    } catch (err) {
        throw err;
    }
}

async function getBooksInfo() {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("bookStore").collection("bookInfo").find({}).toArray();
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function deleteBookInfo(bookId) {
    const client = getClient();
    try {
        await client.connect();
        return await client.db("bookStore").collection("bookInfo").deleteOne({ bookId });
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}
export default{
    createBookInfo,
    updateBookInfo, 
    getBookInfo, 
    createReview, 
    deleteReview, 
    getBooksInfo, 
    deleteBookInfo 
}