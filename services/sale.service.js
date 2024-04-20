import SaleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import BookRepository from "../repositories/book.repository.js";

async function createSale(sale) {
    let error = "";
    if (!await ClientRepository.getClient(sale.client_id)) {
        error = "O client_id informado não existe.";
    }
    const book = await BookRepository.getBook(sale.book_id);
    if (!book) {
        error += "O book_id informado não existe.";
    }
    if (error) {
        throw new Error(error);
    }

    if (book.stock > 0) {
        sale = await SaleRepository.insertSale(sale);
        book.stock--;
        await BookRepository.updateBook(book);
        return sale;
    } else {
        throw new Error("O produto informado não possui estoque.");
    }
}

async function getSales(bookId, authorId) {
    if (bookId) {
        return await SaleRepository.getSalesByBookId(bookId);
    }
    if (authorId) {
        return await SaleRepository.getSalesByAuthorId(authorId);
    }
    return await SaleRepository.getSales();
}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await SaleRepository.getSale(id);
    if (sale) {
        const book = await BookRepository.getBook(sale.book_id);
        await SaleRepository.deleteSale(id);
        book.stock++;
        await BookRepository.updateBook(book);
    } else {
        throw new Error("O id da sale informado não existe.");
    }
}

async function updateSale(sale) {
    let error = "";
    if (!await ClientRepository.getClient(sale.client_id)) {
        error = "O client_id informado não existe.";
    }
    if (!await BookRepository.getBook(sale.book_id)) {
        error += "O book_id informado não existe.";
    }
    if (error) {
        throw new Error(error);
    }
    return await SaleRepository.updateSale(sale);
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}