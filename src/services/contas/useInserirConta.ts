import { Account } from "../../services/type"
import { useEffect, useReducer, useState } from "react"
import { SumAccount } from "./sumContas"
import useMyContext from "../usecontext"

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
    const [ modo, setModo ] = useState< 'INSERIR'| 'ALTERAR' >('INSERIR')
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ mensagem, setMensagem ] = useState("")
    const { contas, sumAccounts, deleteConta, inserirConta, updateConta, movimentacoes } = useMyContext()
    
    useEffect(() => {
        if(contas.map((conta) => conta.id).includes(state.id)){
            setModo('ALTERAR')
            dispatch({
                type: "SET_DESCR", 
                payload: contas.filter((conta) => conta.id===state.id)[0].description 
            })
        }else{
            setModo("INSERIR")
            dispatch({ type: "SET_DESCR", payload: "" })            
        }
    },[state.id])
    
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

    const setId = (e:number) => {
        dispatch({ type: "SET_ID", payload: e })
        setMensagem("")
    }
    const setDescr = (e: string) => {
        dispatch({type: "SET_DESCR", payload: e })
        setMensagem("")
    }

    const salvar = async() => {
        if(!validarDados(state)) return
        
        try {
            const con:Account = {
                id: state.id,
                description: state.description,
            }
            if(modo === "INSERIR"){
                const id:number = await inserirConta(con)
                dispatch({ type: "SET_ID", payload: id })            
                setMensagem("Conta inserida com sucesso")          
            }else{
                await updateConta(con)
                setMensagem("Conta Alterada com sucesso")                
            }
        } catch (error) {
            console.log(error)
            setMensagem("Ocorreu um erro ao inserir conta!")          
        }

    }

    const deletar = ( conta:SumAccount | Account ) => {
        const m = movimentacoes.filter((mov) => mov.idaccount === conta.id)
        if(!confirm(`Confirma deletar a Conta ${ conta.description }?`)) return
        if(m.length > 0)
            if(!confirm(`ATENCÃO! A conta  ${ conta.description } possui movimentações vinculadas a ela.
            Ao deleta-la você TAMBEM deletará todas as movimentações vinculadas. Confirma`)) return
        try {
            deleteConta(conta.id)
            setId(0)
            setMensagem('conta deletada')            
        } catch (error:any) {
            setMensagem(`Erro ao deletar conta: 
                ${error.message}`)
        }
    }

    return {
        id: state.id,
        description: state.description,
        mensagem,
        setId,
        setDescr,
        salvar,
        deletar,
        sumAccounts,
        modo
    }


}

export default useInserirCon