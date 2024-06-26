import BookRepository from "../repositories/book.repository.js";
import AuthorRepository from "../repositories/author.repository.js";

async function createBook(book) {
    if (await AuthorRepository.getAuthor(book.author_id)) {
        return await BookRepository.insertBook(book);
    }
    throw new Error("O author_id informado não existe.");
}

async function getBooks() {
    return await BookRepository.getBooks();
}

async function getBook(id) {
    return await BookRepository.getBook(id);
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

export default {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook
}