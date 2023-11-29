import express from "express";
import { router } from "./router";
//import { Database } from "./database/db";
//import { PessoaService } from "./services/pessoaService";

export const app = express();

app.use(express.json());
app.use(router);

// //Instância do databse
// const db = Database.getInstance();
// db.connect();

// const pessoaService = new PessoaService(db);
// export { pessoaService };
