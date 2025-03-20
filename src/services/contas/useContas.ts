import { useState } from "react"
import { Movimentacao, Account } from "../type"
import axios from 'axios'
import { FetchError } from "../usecontext"
import { SumAccount } from "./sumContas"



const useContas = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
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
            const res = await axios.get(`${apiUrl}/contas`, { timeout: 600 })
            const acc: Account[] = res.data.resposta
            setContas(acc)
        } catch (error:any) {
            setError(error.message)
            return []
        }finally{
            setLoading(false)
        }
    }

    const inserirConta = async ( conta:Account ):Promise<number> => {
        try {
            setLoading(true)
            const res = await axios.put(`${apiUrl}/contas`, conta)
            const id:number = res.data.resposta.id
            setContas((contas) => [ ...contas, { ...conta, id: id } ] )
            return id
        } catch (error:any) {
            setError(error.message)
            throw error.message
            return 0
        }finally{
            setLoading(false)
        }
    }

    const deleteConta = async ( id:number ) => {
        try {
            setLoading(true)
            axios.delete(`${apiUrl}/contas`, { data: {
                id: id
            } })
            setContas(contas.filter((conta) => conta.id !== id))
        } catch (error:any) {
            setError(error.message)
            throw error.message
        }finally{
            setLoading(false)
        }
    }

    const updateConta = async ( newConta: Account ) => {
        try {
            setLoading(true)
            await axios.patch(`${apiUrl}/contas`, newConta)
            setContas(contas.map((conta) => conta.id === newConta.id? newConta : conta))
        } catch (error:any) {
            setError(error.message)
            throw error.message
        }finally{
            setLoading(false)
        }
    }

    return{
        contas,
        loadingContas,
        errorContas,
        fetchContas,
        totalizarContas,
        updateConta,
        deleteConta,
        inserirConta
    }
}

export default useContas