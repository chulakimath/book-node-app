import { Books, chapters ,verses,versesTranslation} from "../models/booksModel.js";


export const establishConnection = async () => {
    try {
        return await Promise.all([
            Books(),
            chapters(),
            verses(),
            versesTranslation()
        ]);

    } catch (err) {
        console.error("Error creating tables:", err);
        throw err;
    }
};
