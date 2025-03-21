import { useSearchParams } from "react-router-dom"


const useFiltros = () => {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const prmCategorias = searchParams.get('categorias') || ""
    const filterInitialDate = searchParams.get('dataI') || ""
    const filterFinalDate = searchParams.get('dataF') || ""

    const filterCategories = prmCategorias.split(',')

    //define os setters das categorias
    const setFilterCategories = ( categories: string[] ) => {
        setSearchParams(prm => {
            if(categories.length > 0){
                prm.set('categorias', categories.toString())
            }else{
                prm.delete('categorias')                
            }
            return prm
        })   
    }

    const insertFilterCategories = (id: string) => {
        setFilterCategories([ ...filterCategories, id ])
    }

    const removeFilterCategories = (id: string) => {
        setFilterCategories( filterCategories.filter((categoryId) => id !== categoryId ) )
    }

    const setFilterInitialDate = (dataInicial: string) => {
        setSearchParams(prm => {
            if(dataInicial.length > 0){
                prm.set('dataI', dataInicial)
            }else{
                prm.delete('dataI')            
            }
            return prm
        })   
    }

    const setFilterFinalDate = (dataFinal: string) => {
        setSearchParams(prm => {
            if(dataFinal.length > 0){
                prm.set('dataF', dataFinal)
            }else{
                prm.delete('dataF')            
            }
            return prm
        })   
    }

   
    return {
        setFilterCategories,
        setFilterFinalDate,
        setFilterInitialDate,
        filterCategories,
        insertFilterCategories,
        removeFilterCategories,
        filterInitialDate,
        filterFinalDate
    }
}

export default useFiltros