import { Request, Response } from "express";
import { PlanosService } from "../services/planoService";


const planoService = new PlanosService();

export class PlanoController {
    async AllPlanos(req: Request, res: Response) {
        const planos = await planoService.getAll();
        return res.json(planos);
    }

    async createPlanos(req: Request, res: Response) {
        try {
            const {nome, descricao, preco} = req.body;
            const plano = await planoService.createPlanos({
                nome, descricao, preco
            });
            res.status(201).json(plano);
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }

    async updatePlanos(req: Request, res: Response) {
        try {
            const plano = await planoService.updatePlano(req.params.id, req.body);
            if (plano) {
                res.status(201).json(plano);
            }
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }

    async deletePlano(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await planoService.deletePlano(id);
            res.status(200).json({message: "Plano deletado."});
        } catch (error) {
            res.status(500).json({
                error: "Usuário não encontrado."
            });
        }
    }
}