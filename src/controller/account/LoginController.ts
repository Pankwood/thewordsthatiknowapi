import { Request, Response } from 'express';
import User from '../../database/schemas/account/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginController {
    async login(request: Request, response: Response) {
        await User.findOne({
            email: request.body.email
        }).then(user => {
            if (!user) {
                return response.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                request.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return response.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ email: user.email, fullName: user.fullName }, "secret-d41d8cd98f00b204e9800998ecf8427e", {
                expiresIn: 86400 // 24 hours
            });

            return response.status(200).send({
                accessToken: token
            });
        }).catch(err => {
            response.status(500).send({ message: err.message });
        });
    }
}

export default new LoginController;