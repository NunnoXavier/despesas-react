import { Account, Category, SumCategory, Transaction } from "./type"
import useCategorias from "./categorias/useCategorias"
import useMovimentacoes from "./movimentacoes/useMovimentacoes"
import { createContext, useContext, useEffect } from "react"
import { Movimentacao } from "./type"
import { SumAccount } from "./contas/sumContas"
import useContas from "./contas/useContas"

export type FetchError = |string|null

type Context = {
    categorias: Category[],
    totalizarCategorias: (movimentacoes: Movimentacao[]) => SumCategory[],
    loadingCategorias: boolean,
    errorCategorias: FetchError,
    movimentacoes: Movimentacao[],
    movimentacoesFiltro: Movimentacao[],
    setMovimentacoesFiltro:(Movimentacoes: Movimentacao[]) => void,
    loadingMovimentacoes: boolean,
    errorMovimentacoes: FetchError
    deleteMovimentacao: (id:number) => void,
    inserirMovimentacao: (registro:Transaction) => Promise<number>,
    updateMovimentacao: (registro:Transaction) => Promise<void>
    contas: Account[],
    totalizarContas: (movimentacoes: Movimentacao[]) => SumAccount[],    
    loadingContas: boolean,
    errorContas: FetchError,
    deleteConta: (id:number) => Promise<void>,
    inserirConta: (conta:Account) => Promise<number>,
    updateConta: (conta:Account) => Promise<void>
}

const InitialContext = {
    categorias: [],
    totalizarCategorias:() => [],
    loadingCategorias: false,
    errorCategorias: null,
    movimentacoes: [],
    movimentacoesFiltro: [],
    setMovimentacoesFiltro: () => null,
    loadingMovimentacoes: false,
    errorMovimentacoes: null,
    deleteMovimentacao: () => null,
    inserirMovimentacao: async() => 0,
    updateMovimentacao: async() => undefined,
    contas: [],
    totalizarContas: () => [],        
    loadingContas: false,
    errorContas: null,
    deleteConta: async() => undefined,
    inserirConta: async() => 0,
    updateConta: async() => undefined
}

const MyContext = createContext<Context>(InitialContext)

export const  MyProvider = function({ children }: { children: React.ReactNode }){  
    const { categorias, totalizarCategorias, loadingCategorias, errorCategorias, fetchCategorias } = useCategorias()
    const { contas, totalizarContas, loadingContas, errorContas, fetchContas, deleteConta, inserirConta, updateConta } = useContas()
    const { movimentacoes, loadingMovimentacoes, errorMovimentacoes, fetchMovimentacoes, updateMovimentacao,
        movimentacoesFiltro, setMovimentacoesFiltro, deleteMovimentacao, inserirMovimentacao } = useMovimentacoes()
    
    useEffect(() => {
        fetchCategorias()
        .then(() => fetchContas())        
        .then(() => fetchMovimentacoes())        
    },[])

    return(
        <MyContext.Provider value={{ 
            categorias, totalizarCategorias, loadingCategorias, errorCategorias,
            contas, totalizarContas, loadingContas, errorContas, deleteConta, inserirConta, updateConta,
            movimentacoesFiltro, setMovimentacoesFiltro, deleteMovimentacao, updateMovimentacao,
            movimentacoes,loadingMovimentacoes, errorMovimentacoes, inserirMovimentacao             
        }}>
            {children}
        </MyContext.Provider>

    )
}

const useMyContext = () => {
    const context = useContext(MyContext)

    return context
}

export default useMyContext