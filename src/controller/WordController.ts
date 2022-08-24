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
        try {
            const wordExist = await Word.findOne(request.body);

            if (wordExist)
                return response.status(400).json({
                    error: "Ooops",
                    message: "Word already exists",
                });

            const word = await Word.create(request.body);
            console.debug(request.body);
            response.status(201).json(word);
        } catch (error) {
            return response.status(500).send({
                error: "Registration error",
                message: error,
            })
        }
    }
}

export default new WordController;