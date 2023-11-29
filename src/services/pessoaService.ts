import { pessoaModel } from "../models/pessoaModel";
import { InterfaceCrud } from "./interfaces";
import query from "../database/db";

export class PessoaService implements InterfaceCrud<pessoaModel> {

    async getAll(): Promise<pessoaModel[]> {
        const result = await query("SELECT id, nome, cpf, tipo_pessoa, email, tipo_cadastro FROM users ORDER BY nome ASC");
        return result as pessoaModel[];
    }

    async findUserEmail(email: string): Promise<pessoaModel> {
        const result = await query("SELECT nome, cpf, password, tipo_pessoa, email, tipo_cadastro FROM users WHERE email=$1", [
            email,
        ]);
        return result.length ? result[0] : null;
    }

    async find(cpf: string): Promise<pessoaModel> {
        const result = await query(
            "SELECT nome, cpf, tipo_pessoa, email, tipo_cadastro FROM users WHERE cpf=$1", 
            [cpf]
        );
        return result.length ? result[0] : null;
    }

    async create(payload: pessoaModel): Promise<pessoaModel> {
        const { nome, cpf, password, tipo_pessoa, email, tipo_cadastro } = payload;
        const values = [nome, cpf, password, tipo_pessoa, email, tipo_cadastro];
        const result = await query(`INSERT INTO users (nome, cpf, password, tipo_pessoa, email, tipo_cadastro)
        VALUES($1, $2, $3, $4, $5, $6) Returning *;`, values);
        return result.length ? result[0] : null;
    }

    async update(id: string, payload: pessoaModel): Promise<pessoaModel | null> {
        try {
            const { nome, cpf, tipo_pessoa, email, tipo_cadastro } = payload;
            const values = [nome, cpf, tipo_pessoa, email, tipo_cadastro, id];
            const result = await query(
                "UPDATE users SET nome = $1, cpf = $2, tipo_pessoa = $3, email = $4, tipo_cadastro = $5 WHERE id = $6 RETURNING *;",
                values
            );
            return result.length ? result[0] : null;
        } catch (error) {
            console.error("Erro ao executar a atualização:", error);
            throw error.message("Erro ao atualizar dados"); 
        }
    }

    async delete(id: string): Promise<pessoaModel> {
        const values = [id];
        const result = await query("DELETE FROM users WHERE id = $1", values);
        return result.length ? result[0] : null;
    }
}