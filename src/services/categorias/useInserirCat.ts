import { Category } from "../../services/type"
import { useEffect, useReducer, useState } from "react"
import useMyContext from "../usecontext"

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
    const [ corMensagem, setCorMensage] = useState<'sucess'|'alert'|'error'>('sucess')
    const [ modo, setModo ] = useState<'INSERIR'|'ALTERAR'>('INSERIR')
    const { categorias, inserirCategoria, updateCategoria } = useMyContext()
    
    useEffect(() => {
        const categoriaAtual = categorias.filter((cat) => cat.id === state.id)[0] 
        if( categoriaAtual ){
            setModo("ALTERAR")
            dispatch({ type: "SET_ID", payload: categoriaAtual.id })
            dispatch({ type: "SET_DESCR", payload: categoriaAtual.description })
            dispatch({ type: "SET_TYPE", payload: categoriaAtual.type })            
        }else{
            setModo("INSERIR")            
            dispatch({ type: "SET_DESCR", payload: "" })
            dispatch({ type: "SET_TYPE", payload: "" })
        }
    },[state.id])

    const validarDados = ( state:ICategory ):boolean => {
        try {
            if(state.description.length === 0){
                setCorMensage("alert")
                setMensagem("Descrição inválida")
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    } 

    const setId = (e:string) => {
        dispatch({ type: "SET_ID", payload: Number(e) })
        setMensagem("")          
    }
    const setDescr = (e:string) => {
        dispatch({type: "SET_DESCR", payload: e })
        setMensagem("")          
    }
    const setType = (e:string) => {
        dispatch({type: "SET_TYPE", payload: e })
        setMensagem("")          
    }


    const salvar = async() => {
        if(!validarDados(state)) return

        try {
            const cat:Category = {
                id: state.id,
                description: state.description,
                type: state.type
            }

            if(modo === "INSERIR"){
                const id = await inserirCategoria(cat)
                setId(id.toString())
                setCorMensage("sucess")
                setMensagem("Categoria inserida com sucesso")
            }else{
                updateCategoria(cat)            
                setCorMensage("sucess")
                setMensagem("Categoria alterada com sucesso")                
            }

        } catch (error) {
            console.log(error)
            setCorMensage("error")
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
        salvar,
        categorias,
        modo,
        corMensagem       
    }


}

export default useInserirCat