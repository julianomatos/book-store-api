import AuthorService from "../services/author.service.js";

async function createAuthor(req, res, next) {
    try {
        let author = req.body;
        if (!author.name || !author.email || !author.address) {
            throw new Error("Name, Email e Address são obrigatórios.");
        }        
        author = await AuthorService.createAuthor(author);
        res.send(author);
        logger.info(`POST /author - ${JSON.stringify(author)}`);
    } catch (err) {
        next(err);
    }
}

async function getAuthors(req, res, next) {
    try {
        res.send(await AuthorService.getAuthors());
        logger.info("GET /author");
    } catch (err) {
        next(err);
    }
}

async function getAuthor(req, res, next) {
    try {
        res.send(await AuthorService.getAuthor(req.params.id));
        logger.info("GET /author");
    } catch (err) {
        next(err);
    }
}

async function deleteAuthor(req, res, next) {
    try {
        await AuthorService.deleteAuthor(req.params.id)
        res.end();
        logger.info("DELETE /author");
    } catch (err) {
        next(err);
    }
}

async function updateAuthor(req, res, next) {
    try {
        let author = req.body;
        if (!author.author_id || !author.name || !author.email || !author.address) {
            throw new Error("Author ID, Name, Email e Address são obrigatórios.");
        }        
        author = await AuthorService.updateAuthor(author);
        res.send(author);
        logger.info(`PUT /author - ${JSON.stringify(author)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createAuthor,
    getAuthors,
    getAuthor,
    deleteAuthor,
    updateAuthor
}