import express from "express";
import BookController from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", BookController.createBook);
router.get("/", BookController.getBooks);
router.get("/info", BookController.getBooksInfo);
router.get("/:id", BookController.getBook);
router.delete("/:id", BookController.deleteBook);
router.put("/", BookController.updateBook);
router.post("/info", BookController.createBookInfo);
router.put("/info", BookController.updateBookInfo);
router.post("/review", BookController.createReview);
router.delete("/:id/review/:index", BookController.deleteReview);
router.delete("/info/:id", BookController.deleteBookInfo);
// router.get("/", BookController.getBooksByAuthor);

export default router;