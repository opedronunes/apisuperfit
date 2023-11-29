import { Request, Response } from "express";
import { HrAulaService } from "../services/hrAulaService";

const hrAulaService = new HrAulaService();

export class HrAulaController {
    async AllHrAulas(req: Request, res: Response) {
        const aulas = await hrAulaService.getAll();
        return res.json(aulas);
    }

    async createHrAulas(req: Request, res: Response) {
        try {
            const {dia_semana, hora_inicio, hora_fim, modalidade_id, instrutor_id} = req.body;
            const aulas = await hrAulaService.createHrAula({
                dia_semana, hora_inicio, hora_fim, modalidade_id, instrutor_id
            });
            res.status(201).json(aulas);
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }

    async updateHrAulas(req: Request, res: Response) {
        try {

            const {id} = req.params;
            const idAula = await hrAulaService.findAula(id);

            if (!idAula) {
                res.status(500).json({
                    error: "Aula não encontrada."
                });
            }
            const aulas = await hrAulaService.updateHrAula(id, req.body);
            if (aulas) {
                res.status(201).json(aulas);
            }
        } catch (error) {
            res.status(500).json({
                error: "Erro ao atualizar",
                message: error.message
            });
        }
    }

    async deleteHrAula(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const idAula = await hrAulaService.findAula(id);

            if (!idAula) {
                res.status(500).json({
                    error: "Aula não encontrada."
                });
            }
            await hrAulaService.deleteHrAula(id);
            res.status(200).json({message: "Horário de aula deletado."});
        } catch (error) {
            res.status(500).json({
                error: "Erro ao deletar.",
                message: error.message
            });
        }
    }
}