import { Request, Response } from 'express';
import Word from '../database/schemas/Word';

class WordController {
    async find(request: Request, response: Response) {
        try {
            const words = await Word.find();
            return response.json(words);
        } catch (error) {
            return response.status(500).send({
                error: "Unable to retrieve words",
                message: error,
            })
        }
    }

    async findByWordAndLanguage(request: Request, response: Response) {
        try {
            const words = await Word.findOne(request.params);
            return response.json(words);
        } catch (error) {
            return response.status(500).send({
                error: "Unable to retrieve word",
                message: error,
            })
        }

    }

    async create(request: Request, response: Response) {
        const { wordName, languageId, userId } = request.body;
        Word.findOne({ wordName: wordName, languageId: languageId, userId: userId }, function (err, doc) {
            console.debug("doc", arguments);
            if (err) {
                return response.status(500).send({
                    error: "Registration error",
                    message: err,
                })
            }
            if (doc) {
                return response.status(422).json({
                    error: "Word already exists",
                    message: doc,
                });
            }
            else {
                const word = Word.create({ wordName: wordName, languageId: languageId, userId: userId }, function (errx, docx) {
                    if (errx?.name === "ValidationError") {
                        return response.status(400).send({
                            error: "Invalid data",
                            message: errx,
                        })
                    }
                    if (errx) {
                        return response.status(500).send({
                            error: "Registration error",
                            message: errx,
                        })
                    }
                    return response.status(201).json(docx);
                });
            }
        });
    }
}

export default new WordController;