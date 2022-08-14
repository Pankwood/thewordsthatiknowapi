import { Request, Response } from 'express';
import Language from '../database/schemas/Language';

class LanguageController {
    async find(request: Request, response: Response) {
        try {
            const languages = await Language.find();
            return response.json(languages);
        } catch (error) {
            return response.status(500).send({
                error: "Unable to retrieve languages",
                message: error,
            })
        }
    }
}

export default new LanguageController;