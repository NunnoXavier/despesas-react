import useCurrency from "../../utils/useCurrency"
import useMyContext from "../../services/usecontext"

type CategoriasProps = {
    ClassName?: string,
}


const Categorias = (props: CategoriasProps) => {    
    
    const { totalizarCategorias, loadingCategorias, errorCategorias, 
        movimentacoesFiltro, loadingMovimentacoes, errorMovimentacoes } = useMyContext()

    if(loadingCategorias || loadingMovimentacoes){
        return (
            <h1>Carregando Categorias</h1>
        )
    }

    if(errorCategorias || errorMovimentacoes){
        console.log(errorCategorias)
        console.log(errorMovimentacoes)
        return (
            <h1>Erro ao carregar Categorias</h1>
        )
    }

    const sumCategorias = totalizarCategorias(movimentacoesFiltro)
    return(
        <div className={ `${props.ClassName} `}>
            <h1 className="text-xl font-bold text-center">Categorias</h1>
            <div className="grid grid-cols-1">
                {
                    sumCategorias
                    .sort((a,b) => a.percent < b.percent? 1 : -1)
                    .map(( category ) => {
                        if(category.sum === 0){
                            return 
                        } 
                        return (
                            <div key={ category.id } className="col-span-1">
                                <span className="text-xs"> { category.description }</span>
                                <div className="grid grid-cols-12 space-x-2">
                                    <div className="col-span-10 bg-slate-300 rounded-lg overflow-clip">
                                        <div className="rounded-lg overflow-visible" 
                                            style={{ 
                                                width: `${category.percent.toFixed(0)}%`,
                                                background: `${ category.type === "C"? "#33dd77" : "#ff6666" }`
                                            }}>
                                            <span className="text-xs text-nowrap mx-2">
                                                { useCurrency.toBR(category.sum) }
                                            </span>
                                        </div>
                                    </div>
                                    <span className="col-span-2 text-xs text-center">
                                        {category.percent.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Categorias