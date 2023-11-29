import { InterfaceCrudMatricula } from "./interfaces";
import { MatriculaModel } from "../models/matriculaModel";
import query from "../database/db";

export class MatriculaService implements InterfaceCrudMatricula<MatriculaModel>{
    async getAll(): Promise<MatriculaModel[]> {
        const result = await query("SELECT * FROM matriculas");
        return result as MatriculaModel[];    
    }
    async createMatricula(payload: MatriculaModel): Promise<MatriculaModel>{
        const {aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim} = payload;
        const values = [aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim];
        const result = await query(`INSERT INTO matriculas (aluno_id, plano_id, dia_vencimento, valor_mensalidade, data_inicio, data_fim)
        VALUES ($1,$2,$3,$4,$5,$6) Returning *;`, values);
        return result.length ? result[0] : null;
    }
}

