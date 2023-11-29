import { Request, Response } from "express";
import { ModalidadeService } from "../services/modalidadeService";

const modalidadeService = new ModalidadeService();

export class ModalidadeController {
    async AllModalidades(req:Request, res:Response) {
        const modalidades = await modalidadeService.getAll();
        return res.json(modalidades);
    }

    async createModalidade(req:Request, res:Response) {
        try {
            const {nome} = req.body;
            const modalidade = await modalidadeService.createModalidade({
                nome
            });
            res.status(201).json(modalidade);
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }
}