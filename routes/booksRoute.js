import express from "express";
import {getBooks,getChaptersByBookId,getVersesByChapterId} from "../controllers/booksController.js"
export const booksRouter = express.Router();
booksRouter.get("/",getBooks);
booksRouter.get("/chapters/:book_id",getChaptersByBookId);
booksRouter.get("/verses/:book_id/:chapter_id",getVersesByChapterId);
