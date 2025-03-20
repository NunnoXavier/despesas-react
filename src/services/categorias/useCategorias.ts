import { useState } from "react"
import { Category, Movimentacao, SumCategory } from "../type"
import axios from 'axios'
import { FetchError } from "../usecontext"

const useCategorias = () => {
    
    const apiUrl = import.meta.env.VITE_API_URL
    const [ categorias, setCategorias ] = useState<Category[]>([])
    const [ loadingCategorias, setLoading ] = useState<boolean>(false)
    const [ errorCategorias, setError ] = useState<FetchError>(null)
    
    const totalizarCategorias = (movimentacoes: Movimentacao[]):SumCategory[] =>{
        
        return categorias
            .map((cat) => {
                const sum = movimentacoes
                                .filter((mov) => mov.idcategory === cat.id)
                                .reduce((prev, curr) => prev + curr.amount ,0)
                const totalRec = movimentacoes
                                .filter((mov) => mov.category.type === "C") //pega total somente das entradas
                                .filter((mov) => !mov.category.description
                                    .toLocaleLowerCase()
                                    .includes("transf")) //tira as transferencias do total geral
                                .reduce((prev, curr) => prev + curr.amount ,0)
                const totalDes = movimentacoes
                                .filter((mov) => mov.category.type === "D") //pega total somente das entradas
                                .filter((mov) => !mov.category.description
                                    .toLocaleLowerCase()
                                    .includes("transf")) //tira as transferencias do total geral
                                .reduce((prev, curr) => prev + curr.amount ,0)
               
                const total = totalRec || totalDes || sum

                if(sum > 0){
                    return {
                        ...cat,
                        sum: sum,
                        percent: (sum / total ) * 100
                    }
                }else{
                    return {
                        ...cat,
                        sum: 0,
                        percent: 0
                    }                    
                }
            })
            .filter((cat) => !cat.description.toLocaleLowerCase().includes("transf"))
    }

    const fetchCategorias = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${apiUrl}/categorias`, { timeout: 600 })
            const cat: Category[] = res.data.resposta
            setCategorias(cat)
        } catch (error:any) {
            setError(error.message)
            return []
        }finally{
            setLoading(false)
        }
    }

    const inserirCategoria = async (categoria: Category) => {
        try {
            setLoading(true)
            const res = await axios.put(`${apiUrl}/categorias`, categoria)
            const id:number = res.data.resposta.id
            setCategorias((categorias) => [ ...categorias, { ...categoria, id: id } ])
            return id
        } catch (error:any) {
            setError(error.message)
            return 0
        }finally{
            setLoading(false)
        }
    }

    const updateCategoria = async (categoria: Category) => {
        try {
            setLoading(true)
            await axios.patch(`${apiUrl}/categorias`, categoria)
            setCategorias( categorias.map((cat) => cat.id === categoria.id? categoria : cat) )
        } catch (error:any) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const deleteCategoria = async (categoria: Category) => {
        try {
            setLoading(true)
            await axios.delete(`${apiUrl}/categorias`, {data: {id: categoria.id}})
            setCategorias( categorias.filter((cat) => cat.id !== categoria.id) )
        } catch (error:any) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    return{
        categorias,
        loadingCategorias,
        errorCategorias,
        fetchCategorias,
        totalizarCategorias,
        inserirCategoria,
        updateCategoria,
        deleteCategoria
    }
}

export default useCategorias