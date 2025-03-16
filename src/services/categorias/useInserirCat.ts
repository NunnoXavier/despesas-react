import { Category } from "../../services/type"
import { ChangeEvent, useReducer, useState } from "react"
import axios from 'axios'

export interface ICategory {
    id: any,
    description: string,
    type: string,
}

export type IAction = 
| { type: "SET_ID", payload: number }
| { type: "SET_DESCR", payload: string }
| { type: "SET_TYPE", payload: string }


const reducer = (state:ICategory, action: IAction):ICategory => {
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
        case "SET_TYPE":
            return {
                ...state,
                type: action.payload
            }    
        default:
            return state
    }
}

const initialState:ICategory = {
    id: "",
    description: "",
    type: "C"
}


const useInserirCat = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ mensagem, setMensagem ] = useState("")
    

    const validarDados = ( state:ICategory ):boolean => {
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
    const setType = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: "SET_TYPE", payload: e.target.value })
        setMensagem("")          
    }


    const salvar = async() => {
        if(!validarDados(state)) return
        
        try {
            const cat:Category = {
                id: 0,
                description: state.description,
                type: state.type
            }

            await axios.put('http://localhost:3001/categorias', cat)
            setMensagem("Categoria inserida com sucesso")          
        } catch (error) {
            console.log(error)
            setMensagem("Ocorreu um erro ao inserir categoria!")          
        }

    }

    return {
        id: state.id,
        description: state.description,
        type: state.type,
        mensagem,
        setId,
        setDescr,
        setType,
        salvar        
    }


}

export default useInserirCat