import { Request, Response } from "express";
import { MatriculaService } from "../services/matriculaService";

const matriculaService = new MatriculaService();

export class MatriculaController {
    async AllMatriculas(req: Request, res: Response){
        const matriculas = await matriculaService.getAll();
        res.json(matriculas);
    }

    async createMatriculas(req: Request, res: Response) {
        try {
            const {aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim} = req.body;
            const matricula = await matriculaService.createMatricula({
                aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim
            });
            res.status(201).json(matricula);
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }
}
