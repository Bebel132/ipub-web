export interface IPerson {
    id: string;
    nome: string;
    cpf: string;
    congregacao: string;
    data_nascimento: string;
    data_batismo: string;
    idade: number;
    tem_foto: boolean;    
}

export interface INewPerson {
    nome: string;
    cpf: string;
    congregacao: string;
    data_nascimento: string;
    data_batismo: string;
}