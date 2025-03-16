import { useState } from "react"
import { Movimentacao, Account } from "../type"
import axios from 'axios'
import { FetchError } from "../usecontext"
import { SumAccount } from "./sumContas"



const useContas = () => {
    
    const [ contas, setContas ] = useState<Account[]>([])
    const [ loadingContas, setLoading ] = useState<boolean>(false)
    const [ errorContas, setError ] = useState<FetchError>(null)
    
    const totalizarContas = (movimentacoes: Movimentacao[]):SumAccount[] =>{
        const total = (idconta: number) => {
            let fm = movimentacoes.map((mov) => { return { ...mov } } )
            if(idconta > 0){
                fm = fm.filter((mov) => mov.idaccount === idconta)
            }
            return fm.reduce((prev, curr) => prev + 
                (curr.category.type === 'C'? curr.amount : curr.amount *-1) 
            ,0)
        }
        
        return contas.map((acc) => {    
            return {
                ...acc,
                sum: total(acc.id)
            }
        })
    }

    const fetchContas = async () => {
        try {
            setLoading(true)
            const res = await axios.get("http://localhost:3001/contas", { timeout: 600 })
            const acc: Account[] = res.data.resposta
            setContas(acc)
        } catch (error:any) {
            setError(error.message)
            return []
        }finally{
            setLoading(false)
        }
    }

    return{
        contas,
        loadingContas,
        errorContas,
        fetchContas,
        totalizarContas
    }
}

export default useContas