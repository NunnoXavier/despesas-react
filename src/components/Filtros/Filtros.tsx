import { useState } from "react"
import useFiltros from "../../services/filtros/useFiltros"
import SelectCategorias from "./SelectCategorias"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


type FiltrosProps = {
    className?: string,
}

const Filtros = ( props: FiltrosProps ) => {
    const { 
        filterFinalDate, filterInitialDate, setFilterFinalDate, setFilterInitialDate, 
        filterCategories,insertFilterCategories, removeFilterCategories, setFilterCategories
    } = useFiltros()

    const [ open, setOpen ] = useState(false)

    return (        
        <div className="bg-slate-100">
            <div className={`${ props.className } pt-2 overflow-hidden transition-all duration-300 ease-in-out
            ${ open? 'opacity-100 h-auto translate-y-5' : 'opacity-0 h-0 translate-y-0' }
            bg-slate-100 text-slate-400 gap-2 px-2 grid grid-cols-7`}>            
                <SelectCategorias 
                filterCategories={filterCategories}
                insertFilterCategories={insertFilterCategories}
                removeFilterCategories={removeFilterCategories}
                setFilter={setFilterCategories}
                className="col-span-5 "/>
            
                <div className="col-start-6 col-span-1 border border-slate-300 rounded-lg px-2 py-1 relative h-fit">
                <span className="text-xs rounded-sm px-1 absolute left-2 -top-2 bg-slate-100">Data Inicial</span>        
                    <input className=" font-bold  w-full py-2 outline-0"
                        type="date" 
                        value={filterInitialDate}
                        
                        onChange={setFilterInitialDate}
                    />
                </div>

                <div className="col-span-1 border border-slate-300 rounded-lg px-2 py-1 relative h-fit">
                <span className="text-xs  rounded-sm absolute left-2 -top-2 px-1 bg-slate-100">Data Final</span>                        
                    <input className=" font-bold w-full py-2 outline-0"
                        type="date" 
                        value={filterFinalDate}
                        onChange={setFilterFinalDate}
                    />
                </div>
            </div>
            <button 
            onClick={() => setOpen(!open)}
            className="my-2 h-10 opacity-20 hover:opacity-100 transition-all duration-300"
            >
                { open? <KeyboardArrowUpIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large"/> }
            </button>
        </div>
    )
}

export default Filtros

