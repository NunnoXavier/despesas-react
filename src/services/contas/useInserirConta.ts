import { Account } from "../../services/type"
import { ChangeEvent, useReducer, useState } from "react"
import axios from 'axios'

export interface IAccount {
    id: any,
    description: string,
}

export type IAction = 
| { type: "SET_ID", payload: number }
| { type: "SET_DESCR", payload: string }


const reducer = (state:IAccount, action: IAction):IAccount => {
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

        default:
            return state
    }
}

const initialState:IAccount = {
    id: "",
    description: "",
}


const useInserirCon = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ mensagem, setMensagem ] = useState("")
    

    const validarDados = ( state:IAccount ):boolean => {
        try {
            if(state.description.length === 0){
                setMensagem("Descrição inválida")
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    } 

    const setId = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_ID", payload: Number(e.currentTarget.value) })
        setMensagem("")
    }
    const setDescr = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "SET_DESCR", payload: e.target.value })
        setMensagem("")
    }


    const salvar = async() => {
        if(!validarDados(state)) return
        
        try {
            const con:Account = {
                id: 0,
                description: state.description,
            }

            await axios.put('http://localhost:3001/contas', con)
            setMensagem("Conta inserida com sucesso")          
        } catch (error) {
            console.log(error)
            setMensagem("Ocorreu um erro ao inserir conta!")          
        }

    }

    return {
        id: state.id,
        description: state.description,
        mensagem,
        setId,
        setDescr,
        salvar        
    }


}

export default useInserirCon