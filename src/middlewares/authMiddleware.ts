/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PessoaService } from "../services/pessoaService";

type JwtPayload = {
    cpf: string
}
// interface CustomRequest extends Request {
//     //eslint-disable-next-line @typescript-eslint/no-explicit-any
//     user?: Record<string, any>;
// }

const pessoaService = new PessoaService();

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { authorization } = req.headers;

    if (!authorization) {
        res.status(405).json({
            error: "Não autorizado!"
        });
    }

    const token = authorization.split(" ")[1];

    const { cpf } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

    const user = await pessoaService.find(cpf);

    if (!user) {
        res.status(405).json({
            error: "Não autorizado!"
        });
    }

    //Problema ao definir user do Type Request
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password: _, ...loggedUser } = user;
    // req.user = loggedUser;

    next();
};

