export type MatriculaModel = {
    id?: string;
    aluno_id: number;
    plano_id: number;
    dia_vencimento: string;
    valor_mensalidade: number;
    data_inicio: string;
    data_fim: string
}