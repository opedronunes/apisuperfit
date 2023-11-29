import { InterfaceCrudPlanos } from "./interfaces";
import query from "../database/db";
import { planoModel } from "../models/planoModel";

export class PlanosService implements InterfaceCrudPlanos<planoModel>{
    async getAll(): Promise<planoModel[]> {
        const result = await query("SELECT * FROM planos");
        return result as planoModel[];
    }

    async createPlanos(payload: planoModel): Promise<planoModel> {
        const {nome, descricao, preco} = payload;
        const values = [nome, descricao, preco];
        const result = await query(`INSERT INTO planos (nome, descricao, preco)
        VALUES ($1, $2, $3) Returning *;`, values);
        return result.length ? result[0] : null;
    }

    async updatePlano(id: string, payload: planoModel): Promise<planoModel> {
        try {
            const {nome, descricao, preco} = payload;
            const values = [nome, descricao, preco, id];
            const result = await query(`
                UPDATE planos SET nome = $1, descricao = $2, preco = $3 WHERE id = $4 Returning*;
            `, values);
            return result.length ? result[0] : null;
        } catch (error) {
            console.error("Erro ao executar a atualização:", error);
            throw error.message("Erro ao atualizar dados"); 
        }
    }

    async deletePlano(id: string): Promise<planoModel> {
        const values = [id];
        const result = await query("DELETE FROM planos WHERE id = $1", values);
        return result.length ? result[0] : null;
    }
}