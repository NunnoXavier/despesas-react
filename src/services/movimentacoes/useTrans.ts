import { Transaction } from "../../services/type"
import {  useEffect, useReducer, useState } from "react"
import useDate from "../../utils/useDate";
import useCategorias from "../categorias/useCategorias";
import useContas from "../contas/useContas";
import useMyContext from "../usecontext";

export interface ITransaction {
    id: string,
    data: string,
    amount: string,
    description: string,
    idaccountD: number,
    descrContaD: string;
    idaccountO: number,
    descrContaO: string;
}

export type IAction = 
| { type: "SET_DATA", payload: string }
| { type: "SET_VALOR", payload: string }
| { type: "SET_CONTAO", payload: number }
| { type: "SET_DESCR_CONTAO", payload: string }
| { type: "SET_CONTAD", payload: number }
| { type: "SET_DESCR_CONTAD", payload: string }

const reducer = (state:ITransaction, action: IAction):ITransaction => {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                data: action.payload
            }    
        case "SET_VALOR":
            return {
                ...state,
                amount: action.payload
            }    
        case "SET_CONTAO":
            return {
                ...state,
                idaccountO: action.payload
            }    
        case "SET_DESCR_CONTAO":
            return {
                ...state,
                descrContaO: action.payload
            }    
        case "SET_CONTAD":
            return {
                ...state,
                idaccountD: action.payload
            }    
        case "SET_DESCR_CONTAD":
            return {
                ...state,
                descrContaD: action.payload
            }    
        default:
            return state
    }
}

const initialState:ITransaction = {
    id: "",
    description: "",
    data: "",
    amount: "",
    descrContaD: "",
    idaccountD: 0,
    descrContaO: "",
    idaccountO: 0,
}


const useTrans = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ mensagem, setMensagem ] = useState("")
    const { categorias, fetchCategorias  } = useCategorias()
    const { contas, fetchContas } = useContas()
    const {  inserirMovimentacao } = useMyContext()

    useEffect(() => {
        fetchCategorias()
        fetchContas()
    },[])
    
    const validarDados = ( state:ITransaction ):boolean => {
        try {
            if(!state.data){
                setMensagem("Data inválida")
                return false

            }
            
            if(Number(state.amount) <= 0){
                setMensagem("Valor inválido")
                return false

            }

            if(state.idaccountD <= 0){
                setMensagem("Conta inválida")
                return false
            }
            if(state.idaccountO <= 0){
                setMensagem("Conta inválida")
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    } 

    const setValor = (e: string) => {
        try {
            dispatch({ type: "SET_VALOR", payload: e })                

        } catch (error) {
            return
        }
    }
    const setData = (e: string) => {
        dispatch({ type: "SET_DATA", payload: e })
    }
    const setContaOrigem = (e: string) => {
        dispatch({type: "SET_CONTAO", payload: Number(e)})
        dispatch({type: "SET_DESCR_CONTAO", payload: e })
    }
    const setContaDestino = (e: string) => {
        dispatch({type: "SET_CONTAD", payload: Number(e)})
        dispatch({type: "SET_DESCR_CONTAD", payload: e })
    }

    const salvar = async() => {
        if(!validarDados(state)) return
        
        try {
            const categoriaOrigem = categorias.filter((c) => c.type === 'D' 
                                                          && c.description.toLocaleLowerCase()
                                                                          .includes('transf'))[0]
            const categoriaDestino = categorias.filter((c) => c.type === 'C' 
                                                          && c.description.toLocaleLowerCase()
                                                                          .includes('transf'))[0]
            
            if(!categoriaOrigem){
                setMensagem("Não foi encontrada uma categoria para transaferincia de Origem ")          
                return
            }else if(!categoriaDestino){
                setMensagem("Não foi encontrada uma categoria para transaferincia de Destino ")          
                return
            }

            const movO:Transaction = {
                id: 0,
                data: useDate.parseDb(state.data),
                amount: Number(state.amount),
                description: `Tranf. p/ ${contas.filter((c) => c.id === state.idaccountD)[0].description}`,
                idaccount: state.idaccountO as number,
                idcategory: categoriaOrigem.id,
            }
            
            const movD:Transaction = {
                id: 0,
                data: useDate.parseDb(state.data),
                amount: Number(state.amount),
                description: `Tranf. de ${contas.filter((c) => c.id === state.idaccountO)[0].description}`,
                idaccount: state.idaccountD as number,
                idcategory: categoriaDestino.id,
            }
            
            await inserirMovimentacao(movO)
            await inserirMovimentacao(movD)
            setMensagem("Tranferência efetuada com sucesso")          
        } catch (error:any) {
            setMensagem("Ocorreu um erro ao efetuar tranferencia! " + error.message)          
        }

    }

    return {
        id: state.id,
        description: state.description,
        data: state.data,
        amount: state.amount,
        descrContaOrigem: state.descrContaO,
        idaccountOrigem: state.idaccountO,
        descrContaDestino: state.descrContaD,
        idaccountDestino: state.idaccountD,
        mensagem: mensagem,
        setContaOrigem,
        setContaDestino,
        setData,
        setValor,
        salvar        
    }


}

export default useTrans