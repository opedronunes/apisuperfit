import { Request, Response } from "express";
import { PagamentoService } from "../services/pagamentoService";
import { MatriculaService } from "../services/matriculaService";


const pagamentoService = new PagamentoService();
const matriculaService = new MatriculaService();

export class PagamentoController {

    async AllPagamentos(req: Request, res: Response) {
        const pagamentos = await pagamentoService.getAllPagamentos();
        res.json(pagamentos);
    }

    async createPagamentos(req: Request, res: Response) {
        try {
            const { data, matricula_id, valor } = req.body;
            const pagamento = await pagamentoService.createPagamento({
                data, matricula_id, valor
            });
            res.status(201).json(pagamento);
        } catch (error) {
            res.status(500).json({
                error,
                message: error.message
            });
        }
    }

    async adimplencia(req: Request, res: Response) {

        try {
            const { id } = req.params;

            const matricula = await matriculaService.matriculaId(id);

            if (!matricula) {
                return res.status(401).json({ message: "Matrícula não encontrada para o usuário." });
            } else {
                const pagamento = await pagamentoService.verificaMatricula(matricula.id);

                if (!pagamento) {
                    return res.status(401).json({ message: "Usuário não possui pagamentos registrados." });
                }
                //Data Atual (Mês e Ano)
                const dataAtual = new Date();
                const mesAtual = dataAtual.getMonth() + 1;
                const anoAtual = dataAtual.getFullYear();
                // Data do Pagamento (Mês e Ano)
                const dataPagamento = new Date(pagamento.data);
                const mesPagamento = dataPagamento.getMonth() + 1;
                console.log(mesPagamento);
                const anoPagamento = dataPagamento.getFullYear();
                console.log(anoPagamento);

                if (mesAtual === mesPagamento && anoAtual === anoPagamento) {
                    //Se Usuário estiver matriculado e Pago o valor no mês atual libera o acesso.
                    res.status(200).json({ message: "Usuário está adimplente para o mês atual. Acesso permitido." });
                } else {
                    res.status(401).json({ message: "Usuário não está adimplente para o mês atual." });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao verificar adimplência." });
        }
    }
    async relatorio(req: Request, res: Response){
        try {
            const {dataInicial, dataFinal} = req.query as {dataInicial?: string, dataFinal?: string};
            const relatorio = await pagamentoService.relatorio(dataInicial, dataFinal);
            res.status(200).json(relatorio);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao verificar buscar o Filtro" });
        }
    }
}