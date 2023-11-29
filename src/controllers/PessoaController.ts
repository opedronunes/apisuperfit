import { Request, Response } from "express";
import { PessoaService } from "../services/pessoaService";
import bcrypt from "bcrypt";

const pessoaService = new PessoaService();

export class PessoaController {

    async getAllUsers(req: Request, res: Response) {
        const users = await pessoaService.getAll();
        return res.json(users);
    }
    async findIdUser(req: Request, res: Response) {
        const { id } = req.params;
        const userId = await pessoaService.find(id);
        if (userId) {
            res.status(200).json(userId);
        } else {
            res.status(404).json({ error: "Usuário não encontrado!" });
        }
    }
    async createUser(req: Request, res: Response) {
        try {
            const { nome, email, cpf, password, tipo_pessoa, tipo_cadastro } = req.body;
            const userExists = await pessoaService.findUserEmail(email);
            if (userExists) {
                throw new Error("Usuário já existe");
            }
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await pessoaService.create({
                nome,
                email,
                cpf,
                password: hashPassword,
                tipo_pessoa,
                tipo_cadastro,
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...newUser } = user;

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const user = await pessoaService.update(req.params.id, req.body);
            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...userUpdate } = user;
                res.status(201).json(userUpdate);
            } else {
                res.status(404).json({ error: "Usuário não encontrado!" });
            }
        } catch (error) {
            res.status(500).json({ error: "Usuário não encontrado!" });
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await pessoaService.delete(id);
            res.status(200).json({message: "Usuário excluído com sucesso"});
        } catch (error) {
            res.status(500).json({
                error: "Usuário não encontrado."
            });
        }
    }

}