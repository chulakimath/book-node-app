import { getAllBooks, getAllChaptersByBookId ,getAllVersesByChapterId} from "../models/booksModel.js"
export const getBooks = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json({ status: 1, books: books, stats: books.length });
    } catch (error) {
        res.status(500).json({ error: error.message, stats: 0 });
        console.log("Error - bookController - getBooks", error);
    }
}
export const getChaptersByBookId = async (req, res) => {
    const { book_id } = req.params;
    if (!book_id) {
        res.status(400).json({ status: 0, error: "book_id is required" });
    }
    try {
        const result = await getAllChaptersByBookId(book_id);
        res.status(200).json({ status: 1, chapters: result, stats: result.length });
    } catch (error) {
        console.log("Error - bookController - getChaptersByBookId", error);
        res.status(400).json({ status: 0, error: error.message });
    }
}
export const getVersesByChapterId = async (req, res) => {
    const { book_id, chapter_id } = req.params;
   
    if (!book_id || !chapter_id) {
        res.status(400).json({ status: 0, error: "book_id and chapter_id are required" });
    }
    try {
        const response = await getAllVersesByChapterId(book_id, chapter_id);
        res.status(200).json({ status: 1, verses: response, stats: response.length });
    } catch (error) {
        console.log("Error - bookController - getVersesByChapterId", error);
        res.status(400).json({ status: 0, error: error.message });
    }
}
export const getVersesByVerseId = async (req, res) => {
}