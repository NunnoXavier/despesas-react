import { Transaction } from "../../services/type"
import { useEffect, useReducer, useState } from "react"
import useDate from "../../utils/useDate";
import useMyContext from "../usecontext";
import useMovimentacoes from "./useMovimentacoes";

export interface ITransaction {
    id: string,
    data: string,
    amount: string,
    description: string,
    idaccount: number,
    idcategory: number,    
    descrCategoria: string;
    descrConta: string;
}

export type IAction = 
| { type: "SET_ID", payload: string }
| { type: "SET_DESCR", payload: string }
| { type: "SET_DATA", payload: string }
| { type: "SET_VALOR", payload: string }
| { type: "SET_CATEGORIA", payload: number }
| { type: "SET_CONTA", payload: number }
| { type: "SET_DESCR_CATEGORIA", payload: string }
| { type: "SET_DESCR_CONTA", payload: string }

const reducer = (state:ITransaction, action: IAction):ITransaction => {
    switch (action.type) {
        case "SET_ID":
            return {
                ...state,
                id: action.payload
            }
        case "SET_DESCR":
            return {
                ...state,
                description: action.payload
            }    
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
        case "SET_CATEGORIA":
            return {
                ...state,
                idcategory: action.payload
            }    
        case "SET_CONTA":
            return {
                ...state,
                idaccount: action.payload
            }    
        case "SET_DESCR_CATEGORIA":
            return {
                ...state,
                descrCategoria: action.payload
            }    
        case "SET_DESCR_CONTA":
            return {
                ...state,
                descrConta: action.payload
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
    idcategory: 0,
    descrCategoria: "",
    descrConta: "",
    idaccount: 0,
}


const useInserirMov = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const { movimentacoes, inserirMovimentacao, updateMovimentacao } = useMyContext()
    const [ mensagem, setMensagem ] = useState("")
    const [ corMensagem, setCorMensagem ] = useState< 'sucess' | 'alert' | 'error' >('sucess')    
    const [ modo, setModo ] = useState<'INSERIR' | 'ALTERAR'>('INSERIR')
    const { contas, categorias } = useMovimentacoes()
    
    useEffect(() => {
        const registroAtual = movimentacoes.filter((movimentacao) => movimentacao.id === Number(state.id))[0]
        if( registroAtual ){
            dispatch({ type: "SET_DESCR", payload: registroAtual.description })
            dispatch({ type: "SET_DATA", payload: useDate.parse(registroAtual.data) })
            dispatch({ type: "SET_VALOR", payload: registroAtual.amount.toFixed(2) })
            dispatch({ type: "SET_CATEGORIA", payload: registroAtual.idcategory })
            dispatch({ type: "SET_CONTA", payload: registroAtual.idaccount })
            dispatch({ type: "SET_DESCR_CATEGORIA", payload: registroAtual.idcategory.toString() })
            dispatch({ type: "SET_DESCR_CONTA", payload: registroAtual.idaccount.toString() })
            setModo("ALTERAR")
        }else{
            dispatch({ type: "SET_ID", payload: "" })
            dispatch({ type: "SET_DESCR", payload: "" })
            dispatch({ type: "SET_DATA", payload: "" })
            dispatch({ type: "SET_VALOR", payload: "" })
            dispatch({ type: "SET_CATEGORIA", payload: 0 })
            dispatch({ type: "SET_CONTA", payload: 0 })            
            dispatch({ type: "SET_DESCR_CATEGORIA", payload: "" })
            dispatch({ type: "SET_DESCR_CONTA", payload: "" })
            setModo("INSERIR")
        }
    },[state.id, movimentacoes])

   
    const validarDados = ( state:ITransaction ):boolean => {
        try {
            if(modo === "ALTERAR" && Number(state.id) ===0){
                setCorMensagem("alert")
                setMensagem("ID inválido")
                return false     
            }

            if(!state.data){
                setCorMensagem("alert")
                setMensagem("Data inválida")
                return false

            }
            
            if(Number(state.amount) <= 0){
                setCorMensagem("alert")
                setMensagem("Valor inválido")
                return false

            }

            if(state.idaccount <= 0){
                setCorMensagem("alert")
                setMensagem("Conta inválida")
                return false
            }

            if(state.idcategory <= 0){
                setCorMensagem("alert")
                setMensagem("Categoria inválida")
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    } 

    const setId = (e: string) => {
        dispatch({ type: "SET_ID", payload: e })
        setMensagem("")          
    }
    const setDescr = (e: string) => {
        dispatch({type: "SET_DESCR", payload: e })
        setMensagem("")          
    }
    const setValor = (e: string) => {
        try {
            const valor = e
            dispatch({ type: "SET_VALOR", payload: valor })                
            setMensagem("")          

        } catch (error) {
            return
        }
    }
    const setData = (e: string) => {
        dispatch({ type: "SET_DATA", payload: e })
        setMensagem("")          
    }
    const setCategoria = (e: string) => {
        dispatch({type: "SET_CATEGORIA", payload: Number(e)})
        dispatch({type: "SET_DESCR_CATEGORIA", payload: e })
        setMensagem("")          
    }
    const setConta = (e: string) => {
        dispatch({type: "SET_CONTA", payload: Number(e)})
        dispatch({type: "SET_DESCR_CONTA", payload: e})
        setMensagem("")          
    }

    const salvar = async() => {
        if(!validarDados(state)) return
        
        try {
            const mov:Transaction = {
                id: Number(state.id),
                data: useDate.parseDb(state.data),
                amount: Number(state.amount),
                description: state.description,
                idaccount: state.idaccount as number,
                idcategory: state.idcategory as number,
            }

            if(modo === "INSERIR"){
                await inserirMovimentacao(mov)
                setMensagem("Movimentação inserida com sucesso")
                dispatch({ type: "SET_ID", payload: "" })
                dispatch({ type: "SET_DESCR", payload: "" })
            }else{
                await updateMovimentacao(mov)
                setMensagem("Movimentação inserida com sucesso")                
            }
            setCorMensagem("sucess")
        } catch (error) {
            console.log(error)
            setCorMensagem("error")
            setMensagem("Ocorreu um erro ao inserir movimentação!")          
        }

    }

    return {
        id: state.id,
        description: state.description,
        data: state.data,
        amount: state.amount,
        idcategory: state.idcategory,
        descrCategoria: state.descrCategoria,
        descrConta: state.descrConta,
        idaccount: state.idaccount,
        mensagem: mensagem,
        corMensagem: corMensagem,
        setId,
        setDescr,
        setData,
        setCategoria,
        setConta,
        setCorMensagem,
        setValor,
        salvar,
        modo,
        movimentacoes,
        contas,
        categorias              
    }


}

export default useInserirMov