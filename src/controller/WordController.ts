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
        //TODO: Get languages from database
        const languages = ["en", "fr", "pt"];

        //If language is different from the const, throw an 400 error
        if (languages.indexOf(languageId) < 0) {
            return response.status(400).send({
                error: "Invalid language",
                message: "Choose one of these languages: en, fr, pt",
            })
        }

        //Try to get the words from DB
        Word.findOne({ wordName, languageId, userId }, function (err, doc) {
            if (err) {
                return response.status(500).send({
                    error: "Registration error",
                    message: err,
                })
            }
            //If it finds the word, the word already exists. Throw a 422 error
            if (doc) {
                return response.status(422).json({
                    error: "Word already exists",
                    message: doc,
                });
            }
            else {
                //Saving the word in the DB
                const word = Word.create({ wordName, languageId, userId }, function (errx, docx) {
                    //If error name's equal to ValidationError, it means the payload is probably incorrect. Throw a 400 error
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
                    //The word was saved and the user get the response and status code 201
                    return response.status(201).json(docx);
                });
            }
        });
    }

    async deleteByWordAndLanguage(request: Request, response: Response) {
        try {
            const words = await Word.findOneAndDelete(request.body);
            if (words)
                return response.json(words);
            else
                return response.status(404).send({
                    error: "Not Found",
                    message: "Word doesn't exist",
                })
        } catch (error) {
            return response.status(500).send({
                error: "Unable to delete words",
                message: error,
            })
        }

    }
}

export default new WordController;