import dotenv from "dotenv";

dotenv.config();

import { Pool} from "pg";

// Configurações para a conexão com o banco de dados
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
};

// Crie uma instância do pool de conexões
const pool = new Pool(dbConfig);

// Função para executar consultas no banco de dados
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const query = async (text: string, params?: any[]) => {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result.rows;
    } finally {
        client.release();
    }
};

export default query;

