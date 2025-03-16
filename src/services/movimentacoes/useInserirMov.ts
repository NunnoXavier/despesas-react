import { Transaction } from "../../services/type"
import { ChangeEvent, useEffect, useReducer, useState } from "react"
import useDate from "../../utils/useDate";
import axios from 'axios'

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
    const [ mensagem, setMensagem ] = useState("")
    const [ corMensagem, setCorMensagem ] = useState("blue")    
    let sucesso = false
    
    useEffect(() => {
        setCorMensagem(sucesso? "blue" : "red")
    },[mensagem])

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

            if(state.idaccount <= 0){
                setMensagem("Conta inválida")
                return false
            }

            if(state.idcategory <= 0){
                setMensagem("Categoria inválida")
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    } 

    const setId = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_ID", payload: e.currentTarget.value })
        setMensagem("")          
    }
    const setDescr = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "SET_DESCR", payload: e.currentTarget.value })
        setMensagem("")          
    }
    const setValor = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const valor = e.currentTarget.value
            dispatch({ type: "SET_VALOR", payload: valor })                
            setMensagem("")          

        } catch (error) {
            return
        }
    }
    const setData = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_DATA", payload: e.currentTarget.value.slice(0,10) })
        setMensagem("")          
    }
    const setCategoria = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: "SET_CATEGORIA", payload: Number(e.currentTarget.selectedOptions[0].value)})
        dispatch({type: "SET_DESCR_CATEGORIA", payload: e.currentTarget.value })
        setMensagem("")          
    }
    const setConta = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: "SET_CONTA", payload: Number(e.currentTarget.selectedOptions[0].value)})
        dispatch({type: "SET_DESCR_CONTA", payload: e.currentTarget.value })
        setMensagem("")          
    }

    const salvar = async() => {
        if(!validarDados(state)) return
        
        try {
            const mov:Transaction = {
                id: 0,
                data: useDate.parseDb(state.data),
                amount: Number(state.amount),
                description: state.description,
                idaccount: state.idaccount as number,
                idcategory: state.idcategory as number,
            }

            await axios.put('http://localhost:3001/movimentacoes', mov)
            sucesso = true         
            setMensagem("Movimentação inserida com sucesso")          
        } catch (error) {
            console.log(error)
            sucesso = false
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
        salvar        
    }


}

export default useInserirMov