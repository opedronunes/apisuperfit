import { InterfaceCrudMatricula } from "./interfaces";
import { MatriculaModel } from "../models/matriculaModel";
import query from "../database/db";

export class MatriculaService implements InterfaceCrudMatricula<MatriculaModel>{
    async getAll(): Promise<MatriculaModel[]> {
        const result = await query("SELECT * FROM matriculas");
        return result as MatriculaModel[];    
    }
    async getAlunoId(aluno_id: string): Promise<MatriculaModel> {
        const result = await query("SELECT * FROM matriculas WHERE aluno_id = $1", [aluno_id]); 
        return result.length ? result[0] : null;
    }
    async createMatricula(payload: MatriculaModel): Promise<MatriculaModel>{
        const {aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim} = payload;
        const values = [aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim];
        const result = await query(`INSERT INTO matriculas (aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim)
        VALUES ($1,$2,$3,$4,$5,$6) Returning *;`, values);
        return result.length ? result[0] : null;
    }

    async matriculaId(id: string): Promise<MatriculaModel> {
        const result  = await query("SELECT * FROM matriculas WHERE id = $1", [id]);
        return result.length ? result[0] : null;
    }

    async updateMatricula(id: string, payload: MatriculaModel): Promise<MatriculaModel> {
        const {plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim} = payload;
        const values = [plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim, id];
        const result = await query(`
        UPDATE matriculas SET plano_id = $1, dia_vencimento = $2, valor_mensalidade = $3, data_inicio = $4, data_fim = $5 WHERE id = $6 Returning *;` ,
        values);
        return result.length ? result[0] : null;
    }
}

