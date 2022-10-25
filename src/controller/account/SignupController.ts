import { Request, Response } from 'express';
import User from '../../database/schemas/account/User';
import bcrypt from 'bcryptjs';

class SignupController {
    async signup(request: Request, response: Response) {
        User.create({
            email: request.body.email,
            fullName: request.body.fullName,
            password: bcrypt.hashSync(request.body.password, 8)
        });

        return response.status(201).json(request.body);

    }
}

export default new SignupController;