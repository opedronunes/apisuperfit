import { hrAulasModel } from "../models/hraulasModel";
import {InterfaceCrudHrAula } from "./interfaces";
import query from "../database/db";

export class HrAulaService implements InterfaceCrudHrAula<hrAulasModel>{
    async getAll(): Promise<hrAulasModel[]> {
        const result = await query("SELECT * FROM horarios_aulas");
        return result as hrAulasModel[];
    }

    async findAula(id: string): Promise<hrAulasModel> {
        const result = await query("SELECT * FROM horarios_aulas WHERE id = $1", [id]);
        return result.length ? result[0] : null;
    }

    async createHrAula(payload: hrAulasModel): Promise<hrAulasModel> {
        const { dia_semana, hora_inicio, hora_fim, modalidade_id, instrutor_id} = payload;
        const values = [dia_semana, hora_inicio, hora_fim, modalidade_id, instrutor_id];
        const resul = await query(`INSERT INTO horarios_aulas (dia_semana, hora_inicio, hora_fim, modalidade_id, instrutor_id)
        VALUES ($1, $2, $3, $4, $5) Returning *;`, values);
        return resul.length ? resul[0] : null;
    }

    async updateHrAula(id: string, payload: hrAulasModel): Promise<hrAulasModel> {
        const { dia_semana, hora_inicio, hora_fim, modalidade_id, instrutor_id} = payload;
        const values = [dia_semana, hora_inicio, hora_fim, modalidade_id, instrutor_id, id];
        const resul = await query(`UPDATE horarios_aulas SET dia_semana = $1, hora_inicio = $2, hora_fim = $3, modalidade_id = $4, instrutor_id = $5 WHERE id = $6 Returning *;
        `, values);
        return resul.length ? resul[0] : null;
    }

    async deleteHrAula(id: string): Promise<hrAulasModel> {
        const values = [id];
        const result = await query("DELETE FROM horarios_aulas WHERE id = $1", values);
        return result.length ? result[0] : null;
    }

}