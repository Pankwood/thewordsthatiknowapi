import { Request, Response } from 'express';
import Word from '../database/schemas/word';

class WordController {
    async create(request: Request, response: Response) {
        try {
            const word = await Word.create(request.body);
            console.log(request.body);
            response.json(word);
        } catch (error) {
            return response.status(500).send({
                error: "Registration error",
                message: error,
            })
        }
    }
}

export default new WordController;