export interface InterfaceCrud<DTO>{
    getAll(): Promise<DTO[]>;
    find(id: string): Promise<DTO>;
    findUserEmail(email: string): Promise<DTO>;
    create(payload: DTO): Promise<DTO>;
    update(id: string, payload: DTO): Promise<DTO>;
    delete(id: string): Promise<DTO>;
}

export interface InterfaceCrudModalidade<DTO>{
    getAll(): Promise<DTO[]>;
    createModalidade(payload: DTO): Promise<DTO>;
    find(id: string): Promise<DTO>;
}

export interface InterfaceCrudPlanos<DTO>{
    getAll(): Promise<DTO[]>;
    createPlanos(payload: DTO): Promise<DTO>;
    updatePlano(id: string, payload: DTO): Promise<DTO>;
    deletePlano(id: string): Promise<DTO>;
}

export interface InterfaceCrudHrAula<DTO>{
    getAll(): Promise<DTO[]>;
    findAula(id: string): Promise<DTO>;
    createHrAula(payload: DTO): Promise<DTO>;
    updateHrAula(id: string, payload: DTO): Promise<DTO>;
    deleteHrAula(id: string): Promise<DTO>;
}

export interface InterfaceCrudMatricula<DTO>{
    getAll(): Promise<DTO[]>;
    matriculaId(id: string): Promise<DTO>;
    getAlunoId(aluno_id:string): Promise<DTO>
    createMatricula(payload: DTO): Promise<DTO>;
    updateMatricula(id: string, payload: DTO): Promise<DTO>;
    // deleteMatricula(id: string): Promise<DTO>;
}

export interface InterfaceCrudPagamento<DTO>{
    getAllPagamentos(): Promise<DTO[]>;
    createPagamento(payload: DTO): Promise<DTO>;
    verificaMatricula(matricula_id: string): Promise<DTO>;
    relatorio(dataInicial: string, dataFinal: string): Promise<DTO[]>;
}
