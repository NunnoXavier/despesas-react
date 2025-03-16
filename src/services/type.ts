export interface Transaction {
    id:          number;
    amount:      number;
    description: string;
    data:        Date;
    idcategory:    number;
    idaccount:     number;
}

export interface Category {
    id:          number;
    description: string;
    type:        string;
}

export interface SumCategory extends Category {
    sum: number;
    percent: number;
}

export interface Account {
    id:          number;
    description: string;
}

export type Movimentacao = {
    id: number,
    amount: number,
    description: string,
    data: Date,
    idcategory: number,
    category: Category,
    idaccount: number,
    account: Account
}


