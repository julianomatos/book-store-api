import BookService from "../services/book.service.js";

async function createBook(req, res, next) {
    try {
        let book = req.body;
        if (!book.name || !book.value || !book.stock || !book.author_id) {
            throw new Error("Name, Value, Stock e Author ID são obrigatórios.");
        }        
        book = await BookService.createBook(book);
        res.send(book);
        logger.info(`POST /book - ${JSON.stringify(book)}`);
    } catch (err) {
        next(err);
    }
}

async function getBooks(req, res, next) {
    try {
        res.send(await BookService.getBooks(req.query.bookId));
        logger.info("GET /book");
    } catch (err) {
        next(err);
    }
}

// async function getBooksByAuthor(req, res, next) {
//     try {
//         res.send(await BookService.getBooksByAuthor(parseInt(req.query.authorId)));
//         logger.info("GET /book?authorId");
//     } catch (err) {
//         next(err);
//     }
// }

async function getBook(req, res, next) {
    try {
        res.send(await BookService.getBook(req.params.id));
        logger.info("GET /book");
    } catch (err) {
        next(err);
    }
}

async function deleteBook(req, res, next) {
    try {
        await BookService.deleteBook(req.params.id)
        res.end();
        logger.info("DELETE /book");
    } catch (err) {
        next(err);
    }
}

async function updateBook(req, res, next) {
    try {
        let book = req.body;
        if (!book.book_id || !book.name || !book.value || !book.stock || !book.author_id) {
            throw new Error("Book ID, Name, Value, Stock e Author ID são obrigatórios.");
        }        
        book = await BookService.updateBook(book);
        res.send(book);
        logger.info(`PUT /book - ${JSON.stringify(book)}`);
    } catch (err) {
        next(err);
    }
}

async function createBookInfo(req, res, next) {
    try {
        let bookInfo = req.body;
        if (!bookInfo.bookId) {
            throw new Error("BookId é obrigatório.");
        }        
        bookInfo = await BookService.createBookInfo(bookInfo);
        res.end();
        logger.info(`POST /book/info - ${JSON.stringify(bookInfo)}`);
    } catch (err) {
        next(err);
    }
}

async function updateBookInfo(req, res, next) {
    try {
        let bookInfo = req.body;
        if (!bookInfo.bookId) {
            throw new Error("BookId é obrigatório.");
        }        
        bookInfo = await BookService.updateBookInfo(bookInfo);
        res.end();
        logger.info(`PUT /book/info - ${JSON.stringify(bookInfo)}`);
    } catch (err) {
        next(err);
    }
}

async function createReview(req, res, next) {
    try {
        let params = req.body;
        if (!params.bookId || !params.review) {
            throw new Error("BookID e Review são obrigatórios.");
        }
        await BookService.createReview(params.review, params.bookId);
        logger.info(`POST /book/review`);
        res.end();
    } catch (err) {
        next(err);
    }
}

async function deleteReview(req, res, next) {
    try {
        await BookService.deleteReview(req.params.id, req.params.index);
        logger.info(`DELETE /book/${req.params.id}/review/${req.params.index}`);
        res.end();
    } catch (err) {
        next(err);
    }
}

async function getBooksInfo(req, res, next) {
    try {
        res.send(await BookService.getBooksInfo());
        logger.info("GET /book/info");
    } catch (err) {
        next(err);
    }
}

async function deleteBookInfo(req, res, next) {
    try {
        res.send(await BookService.deleteBookInfo(parseInt(req.params.id)));
        logger.info("DELETE /book/info");
    } catch (err) {
        next(err);
    }
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