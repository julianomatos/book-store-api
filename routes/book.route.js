import express from "express";
import BookController from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", BookController.createBook);
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBook);
router.delete("/:id", BookController.deleteBook);
router.put("/", BookController.updateBook);
router.post("/info", BookController.createBookInfo);
router.put("/info", BookController.updateBookInfo);


export default router;