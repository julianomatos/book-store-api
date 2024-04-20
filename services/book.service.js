import BookRepository from "../repositories/book.repository.js";
import AuthorRepository from "../repositories/author.repository.js";
import BookInfoRepository from "../repositories/bookInfo.repository.js";

async function createBook(book) {
    if (await AuthorRepository.getAuthor(book.author_id)) {
        return await BookRepository.insertBook(book);
    }
    throw new Error("O author_id informado não existe.");
}

async function getBooks(authorId) {
    if (authorId) {
        return await BookRepository.getBooksByAuthor(authorId);
    }
    return await BookRepository.getBooks();
}

// async function getBooksByAuthor(authorId){
//     return await BookRepository.getBooksByAuthor(authorId);
// }

async function getBook(id) {
    const book = await BookRepository.getBook(id);
    book.info = await BookInfoRepository.getBookInfo(parseInt(id));
    return book;
}

async function deleteBook(id) {
    await BookRepository.deleteBook(id);
}

async function updateBook(book) {
    if (await AuthorRepository.getAuthor(book.author_id)) {        
        return await BookRepository.updateBook(book);
    }
    throw new Error("O author_id informado não existe.");
}

async function createBookInfo(bookInfo) {
    await BookInfoRepository.createBookInfo(bookInfo);
}

async function updateBookInfo(bookInfo) {
    await BookInfoRepository.updateBookInfo(bookInfo);
}

async function createReview(review, bookId) {
    await BookInfoRepository.createReview(review, bookId);    
}

async function deleteReview(bookId, index) {
    await BookInfoRepository.deleteReview(parseInt(bookId), index);    
}

async function getBooksInfo() {
    return await BookInfoRepository.getBooksInfo();
}

async function deleteBookInfo(bookId) {
    await BookInfoRepository.deleteBookInfo(bookId);
}

export default {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook,
    createBookInfo,
    updateBookInfo,
    createReview,
    deleteReview,
    getBooksInfo,
    deleteBookInfo,
    // getBooksByAuthor
}