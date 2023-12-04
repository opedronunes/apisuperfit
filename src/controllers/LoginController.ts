import { PessoaService } from "../services/pessoaService";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const pessoaService = new PessoaService();

export class LoginController {

    async login(req: Request, res: Response) {

        const { email, password } = req.body;

        const user = await pessoaService.findUserEmail(email);

        if (!user) {
            res.status(404).json({
                error: "E-mail ou senha inválidos"
            });
        }

        const verifyPass = await bcrypt.compare(password, user.password);

        if (!verifyPass) {
            res.status(404).json({
                error: "E-mail ou senha inválidos"
            });
        }

        const token = jwt.sign({ cpf: user.cpf}, process.env.JWT_PASS, {
            expiresIn: "8h"
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userLogin } = user;

        return res.json({
            user: userLogin,
            token: token
        });
    }
}
