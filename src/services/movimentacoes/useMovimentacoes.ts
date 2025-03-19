import {useEffect, useState } from "react"
import { Account, Category, Movimentacao, Transaction } from "../type"
import axios from 'axios'
import  { FetchError } from "../usecontext"
import useCategorias from "../categorias/useCategorias"
import useContas from "../contas/useContas"

const useMovimentacoes = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const [ movimentacoes, setMovimentacoes ] = useState<Movimentacao[]>([])
    const [ movimentacoesFiltro, setMovimentacoesFiltro ] = useState<Movimentacao[]>([])
    const [ loadingMovimentacoes, setLoading ] = useState<boolean>(false)
    const [ errorMovimentacoes, setError ] = useState<FetchError>(null)
    const { categorias, fetchCategorias } = useCategorias()
    const { contas, fetchContas } = useContas()

    useEffect(() => {
        fetchCategorias()
        fetchContas()
    },[])
    
    const fetchMovimentacoes = async () => {
        try {
            setLoading(true)
            const c = await axios.get(`${apiUrl}/categorias`, { timeout: 600 })
            const cats:Category[] = c.data.resposta
            const a = await axios.get(`${apiUrl}/contas`, { timeout: 600 })
            const accs:Account[] = a.data.resposta
            const res = await axios.get(`${apiUrl}/movimentacoes`, { timeout: 600 })
            const trans: Transaction[] = res.data.resposta
            const mov:Movimentacao[] = trans.map((t) => {
                return {
                    ...t,
                    category: cats.filter((cat) => cat.id === t.idcategory)[0],
                    account: accs.filter((acc) => acc.id === t.idaccount)[0],


                }
            })
            setMovimentacoes(mov)
            setMovimentacoesFiltro(mov)            
        } catch (error:any) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    
    const deleteMovimentacao = async(id:number) => {
        try {
            setLoading(true)
            await axios.delete(`${apiUrl}/movimentacoes`, { data: { id: id } })
            setMovimentacoes( movimentacoes.filter((m) => m.id!== id))
            setMovimentacoesFiltro( movimentacoes.filter((m) => m.id!== id))
        } catch (error:any) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const inserirMovimentacao = async (registro: Transaction) => {
        try {            
            setLoading(true)            
            const res = await axios.put(`${apiUrl}/movimentacoes`, registro)            
            const novoId:number = res.data.resposta.id
            const mov:Movimentacao = {
                ...registro,
                id: novoId,
                category: categorias.filter((cat) => cat.id === registro.idcategory)[0],
                account: contas.filter((con) => con.id === registro.idaccount)[0],
            }
            setMovimentacoes([ ...movimentacoes, { ...mov } ])
            return novoId
        } catch (error:any) {
            setError(error.message)
            return 0
        }finally{
            setLoading(false)
        }
    }

    const updateMovimentacao = async (registro: Transaction) => {
        try {
            setLoading(true)
            await axios.patch(`${apiUrl}/movimentacoes`, registro)
            const mov:Movimentacao = {
                ...registro,
                category: categorias.filter((cat) => cat.id === registro.idcategory)[0],
                account: contas.filter((con) => con.id === registro.idaccount)[0],
            }
            console.log(mov)            
            setMovimentacoes(movimentacoes.map((movimentacao) => movimentacao.id === mov.id? mov : movimentacao))
        } catch (error:any) {
            setError(error.message)
            throw error
        }finally{
            setLoading(false)
        }
    }

    return{
        movimentacoes,
        loadingMovimentacoes,
        errorMovimentacoes,
        fetchMovimentacoes,
        movimentacoesFiltro,
        setMovimentacoesFiltro,
        deleteMovimentacao,
        inserirMovimentacao,
        updateMovimentacao,
        categorias,
        contas
    }
}

export default useMovimentacoes