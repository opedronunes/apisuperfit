import { InterfaceCrudPagamento } from "./interfaces";
import { PagamentoModel } from "../models/PagamentoModel";
import query from "../database/db";

export class PagamentoService implements InterfaceCrudPagamento<PagamentoModel>{
    async getAllPagamentos(): Promise<PagamentoModel[]> {
        const result = await query("SELECT * FROM pagamentos");
        return result as PagamentoModel[];
    }

    async createPagamento(payload: PagamentoModel): Promise<PagamentoModel> {
        const { data, matricula_id, valor } = payload;
        const values = [data, matricula_id, valor];
        const result = await query(`INSERT INTO pagamentos (data, matricula_id, valor)
        VALUES ($1,$2,$3) Returning *;`, values);
        return result.length ? result[0] : null;
    }

    async verificaMatricula(matricula_id: string): Promise<PagamentoModel> {
        const result = await query("SELECT * FROM pagamentos WHERE matricula_id = $1 ORDER BY data DESC LIMIT 1", [matricula_id]);
        return result.length ? result[0] : null;
    }

    async relatorio(dataInicial: string, dataFinal: string): Promise<PagamentoModel> {
        const result = await query(`
        SELECT
	p.nome AS plano,
	COUNT(DISTINCT m.aluno_id) AS total_alunos,
	SUM(m.valor_mensalidade) AS valor_total_recebido,
	COUNT(CASE WHEN pag.matricula_id = false THEN 1 END) AS total_inadimplente,
	COUNT(CASE WHEN pag.matricula_id = true THEN 1 END) AS total_adimplente
FROM
	planos p
LEFT JOIN
	matriculas m ON p.id = m.plano_id
LEFT JOIN
	pagamentos pag ON m.id = pag.matricula_id
WHERE
	p.nome IN (SELECT DISTINCT nome FROM planos)
	AND m.data_inicio BETWEEN $1 AND $2
GROUP BY
	p.nome;;
        `, [dataInicial, dataFinal]); // Utiliza a mesma data para o range de início e fim

        return result.length ? result[0] : null;

    }
}