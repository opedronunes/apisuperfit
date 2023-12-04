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
            const matriculaExists = await matriculaService.getAlunoId(aluno_id);
            if (matriculaExists) {
                res.status(404).json({message: "Matrícula já existe com esse aluno!"});
            }else{
                const matricula = await matriculaService.createMatricula({
                    aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim
                });
                res.status(201).json(matricula);
            }
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }

    async matriculaId(req: Request, res: Response){
        const {id} = req.params;
        const matriculaId = await matriculaService.matriculaId(id);
        if (!matriculaId) {
            res.status(404).json({message: "Matrícula não encontrada."});
        }else{
            res.status(200).json(matriculaId);
        }
    }

    async updateMatricula(req: Request, res: Response){
        try {
            const matricula = await matriculaService.updateMatricula(req.params.id, req.body);
            if (matricula) {
                res.status(201).json(matricula);
            }else{
                res.status(404).json({error: "Matrícula não encontrada."});
            }

        } catch (error) {
            res.status(500).json( {error, message: error.message} );
        }
    }
}
