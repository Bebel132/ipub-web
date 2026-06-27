export interface IPerson {
    id: string;
    nome: string;
    cpf: string;
    congregacao: string;
    conjunto: string;
    data_nascimento: string;
    idade: number;
    tem_foto: boolean;    
}

export interface INewPerson {
    nome: string;
    cpf: string;
    congregacao: string;
    conjunto: string;
    data_nascimento: string;
}