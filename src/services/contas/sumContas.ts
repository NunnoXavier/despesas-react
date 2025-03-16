import { Movimentacao } from "../type"
import useContas from "./useContas"

export type SumAccount = {
    id:          number;
    description: string;
    sum:         number;
}

type SumContasProps = {
    movimentacoes: Movimentacao[]
}

const getSumAccount = ( transactions: Movimentacao[], id: number ):number => {
    const ft = transactions.map(( transaction ) => { return { ...transaction }})
    return ft.reduce((prev, curr) => {
        let amount = 0
        if( curr.category.type === "C" ){
            amount = curr.amount
        }else{
            amount = curr.amount * -1
        }
        return curr.idaccount == id? prev + amount : prev
        },0)
}



const sumContas = ( props: SumContasProps ) => {

    const { accounts } = useContas()


    //cria resumo das transaçoes por conta
    const sumAccounts:SumAccount[] = []

    accounts.map((account) => {
        sumAccounts.push({
            ...account,
            sum: getSumAccount(props.movimentacoes, account.id)
        })        
    })    

    return sumAccounts

}

export default sumContas