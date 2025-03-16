import useFiltros from "../../services/filtros/useFiltros"
import SelectCategorias from "./SelectCategorias"


type FiltrosProps = {
    className?: string,
}

const Filtros = ( props: FiltrosProps ) => {
    const { 
        filterFinalDate, filterInitialDate, setFilterFinalDate, setFilterInitialDate, 
        filterCategories,insertFilterCategories, removeFilterCategories, setFilterCategories
    } = useFiltros()

    return (
        <div className={`${ props.className } bg-violet-900 text-violet-200 gap-2 py-4 px-2 grid grid-cols-12`}>
            <SelectCategorias 
            filterCategories={filterCategories}
            insertFilterCategories={insertFilterCategories}
            removeFilterCategories={removeFilterCategories}
            setFilter={setFilterCategories}
            className="col-span-6 "/>
        
            <div className="col-span-3 border border-violet-200 rounded-lg px-2 relative h-fit">
            <span className="text-xs text-violet-200 bg-violet-900 px-1 absolute left-3 -top-2">Data Inicial</span>        
                <input className=" text-violet-200 w-full py-2 outline-0"
                    type="date" 
                    value={filterInitialDate}
                    
                    onChange={setFilterInitialDate}
                />
            </div>

            <div className="col-span-3 border border-violet-200 rounded-lg px-2 relative h-fit">
            <span className="text-xs text-violet-200 bg-violet-900 px-1 absolute left-3 -top-2">Data Final</span>                        
                <input className="text-violet-200 w-full py-2 outline-0"
                    type="date" 
                    value={filterFinalDate}
                    onChange={setFilterFinalDate}
                />
            </div>
        </div>
    )
}

export default Filtros

