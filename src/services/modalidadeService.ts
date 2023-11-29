import { InterfaceCrudModalidade } from "./interfaces";
import { modalidadeModel } from "../models/modalidadeModel";
import query from "../database/db";

export class ModalidadeService implements InterfaceCrudModalidade<modalidadeModel>{
    async getAll(): Promise<modalidadeModel[]> {
        const result = await query("SELECT * FROM modalidades");
        return result as modalidadeModel[];
    }

    async createModalidade(payload: modalidadeModel): Promise<modalidadeModel> {
        const {nome} = payload;
        const values = [nome];
        const result = await query("INSERT INTO modalidades (nome) VALUES($1) Returning*;", values);
        return result.length ? result[0] : null;
    }

    async find(id: string): Promise<modalidadeModel>{
        const result = await query("SELECT * FROM modalidades WHERE id=$1", [id]);
        return result.length ? result[0] : null;
    }
}