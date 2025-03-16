import { ChangeEvent, useEffect, useReducer } from "react"
import { Movimentacao } from "../type"
import useMyContext from "../usecontext"
import useDate from "../../utils/useDate"


type IState = {
    filterCategories: string[],
    filterInitialDate: string,
    filterFinalDate: string,    
}

type IAction =
| { type: "SET_FILTER_CATEGORIES", payload: string[] }
| { type: "INSERT_FILTER_CATEGORY", payload: string }
| { type: "REMOVE_FILTER_CATEGORY", payload: string }
| { type: "SET_INITIAL_DATE", payload: string }
| { type: "SET_FINAL_DATE", payload: string }

 const reducer = ( state: IState, action: IAction ):IState => {
    switch (action.type) {
        case "SET_FILTER_CATEGORIES":         
            return {               
                ...state,
                filterCategories: [ ...action.payload ]
            }
        case "REMOVE_FILTER_CATEGORY":
            return {
                ...state,
                filterCategories: state.filterCategories.filter(( name ) => name !== action.payload )
            }
        case "INSERT_FILTER_CATEGORY":
            return {
                ...state,
                filterCategories: [ ...state.filterCategories, action.payload ]
            }
            case "SET_INITIAL_DATE":
                return {
                    ...state,
                    filterInitialDate: action.payload
                }
            case "SET_FINAL_DATE":
                return {
                    ...state,
                    filterFinalDate: action.payload
                }
        default:
            return state
    }
}

const initialState = ():IState => {
    return {
        filterCategories: [],
        filterInitialDate: useDate.startOfMonth(new Date()),
        filterFinalDate: useDate.parse(new Date()),    
     }
}

const useFiltros = () => {
    const [ state, dispatch ] = useReducer(reducer, undefined, initialState)
    const { movimentacoes, setMovimentacoesFiltro } = useMyContext()

    useEffect(() => {
        filter(movimentacoes);
    }, [state.filterInitialDate, state.filterFinalDate, state.filterCategories, movimentacoes]);    

    //define os setters das categorias
    const setFilterCategories = ( categories: string[] ) => {
        dispatch({ type: "SET_FILTER_CATEGORIES", payload: categories })
    }
    const removeFilterCategories = ( name: string ) => {
        dispatch({ type: "REMOVE_FILTER_CATEGORY", payload: name })
    }
    const insertFilterCategories = ( name: string ) => {
        state.filterCategories.includes(name) ||
        dispatch({ type: "INSERT_FILTER_CATEGORY", payload: name })
    }

    const setFilterInitialDate = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_INITIAL_DATE", payload: e.target.value })
    }
    const setFilterFinalDate = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_FINAL_DATE", payload: e.target.value })
    }


    const filter = ( movimentacao: Movimentacao[] ) => {
        setMovimentacoesFiltro( movimentacao
            .filter(filtered => state.filterInitialDate.length > 0 
                && filtered.data.toString().slice(0,10) >= state.filterInitialDate)
            .filter( filtered => state.filterFinalDate.length > 0 
                && filtered.data.toString().slice(0,10) <= state.filterFinalDate)            
            .filter( filtered => state.filterCategories.length === 0 ||
                state.filterCategories.includes( filtered.category.description ))
            )
                    
    } 

    return {
        filterCategories: state.filterCategories,
        filterInitialDate: state.filterInitialDate, 
        filterFinalDate: state.filterFinalDate,
        setFilterCategories,
        removeFilterCategories,
        insertFilterCategories,
        setFilterInitialDate,
        setFilterFinalDate
    }
}

export default useFiltros