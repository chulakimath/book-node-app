import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.PGSQL_URL);
export const Books = async () => {
  return await sql`
        CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            summary TEXT NULL,
            authors TEXT NULL,
            image TEXT NULL
        )
    `;
};

export const chapters = async () => {
  return await sql`
         CREATE TABLE IF NOT EXISTS chapters (
            id SERIAL PRIMARY KEY,
            chapter_number INTEGER,
            chapter_summary TEXT,
            chapter_summary_hindi TEXT,
            image_name TEXT,
            name TEXT,
            name_meaning TEXT,
            name_translation TEXT,
            name_transliterated TEXT,
            verses_count INTEGER,
            book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
            UNIQUE(chapter_number, book_id)
        )
    `;
};

export const verses = async () => {
  return await sql`
        CREATE TABLE IF NOT EXISTS  verses (
            id SERIAL PRIMARY KEY,
            book_id INTEGER,
            chapter_id INTEGER,
            chapter_number INTEGER,
            external_id INTEGER,
            verse_number INTEGER,
            verse_order INTEGER,
            title TEXT,
            text TEXT,
            transliteration TEXT,
            word_meanings TEXT,
            audio_url TEXT NULL,
            FOREIGN KEY (chapter_number, book_id) REFERENCES chapters(chapter_number, book_id)
    );

    `;
};
export const versesTranslation = async () => {
  return await sql`
        CREATE TABLE IF NOT EXISTS verse_translation (
            id SERIAL PRIMARY KEY,
            book_id INTEGER,
            author_name TEXT,
            author_id INTEGER,
            description TEXT,
            lang TEXT,
            language_id INTEGER,
            verse_number INTEGER,
            verse_id INTEGER,
            status INTEGER DEFAULT 1
        );
    `;
};

export const getAllBooks = async () => {
  return await sql`
        SELECT * FROM books
    `;
};

export const getAllChaptersByBookId = async (book_id) => {
  return await sql`
        SELECT * FROM chapters WHERE book_id = ${book_id} ORDER BY id ASC
    `;
};

export const getAllVersesByChapterId = async (book_id, chapter_id) => {
  return await sql`
        SELECT verses.id,
          verses.chapter_id,
          verses.chapter_number,
          verses.verse_number,
          verses.verse_order,
          verses.title,
          verses.text,
          verses.transliteration,
          verses.word_meanings,
          verses.audio_url,
          COALESCE(json_agg(
                json_build_object(
               'lang',verse_translation.lang,
               'author_name',verse_translation.author_name,
               'description',verse_translation.description
               ) ORDER BY verse_translation.language_id DESC
            )FILTER(WHERE verse_translation.id IS NOT NULL AND verse_translation.status=1)
            ,'[]') AS translations
          FROM verses
          LEFT JOIN verse_translation ON verse_translation.verse_number=verses.verse_order
          WHERE  verses.book_id=${book_id} AND verses.chapter_id = ${chapter_id}
          GROUP BY verses.id
          ORDER BY verses.id ASC
    `;
};
