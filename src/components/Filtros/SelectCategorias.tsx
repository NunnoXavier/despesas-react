import CardCategoria from "./CardCategoria"
import useMyContext from "../../services/usecontext"
import { Box, Popper } from "@mui/material"
import { MouseEvent, useState } from "react"
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp'

type SelectCatProps = { 
    className?: string, 
    filterCategories?:string[], 
    insertFilterCategories?: (name:string) => void, 
    removeFilterCategories: (name:string) => void,
    setFilter?: ( cat: string[] ) => void
}

const SelectCategorias = ( { className, filterCategories, insertFilterCategories, 
                             removeFilterCategories, setFilter }: SelectCatProps ) => {
    const { categorias } = useMyContext()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };

    const clickItem = ( event:MouseEvent<HTMLButtonElement> ) => {    
        insertFilterCategories && insertFilterCategories(event.currentTarget.innerHTML)
        setAnchorEl(null)
    }

    const tudo = () => {
        setFilter && setFilter( categorias.map((cat) => cat.description) )
    }
    const limpar = () => {
        setFilter && setFilter( [] )
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    return (
        <div className={`${ className } grid grid-cols-12 relative`}>    
            <span className="text-xs text-violet-900 bg-violet-200 rounded-sm px-1 absolute left-3 -top-2">Categorias</span>
            <div className="col-span-12 grid grid-cols-12 min-h-10">                
                <Box className="flex col-span-11 border border-violet-200 
                rounded-xl rounded-r-none items-center p-2 gap-1 flex-wrap"
                    // aria-controls={ }
                    // aria-expanded={}
                >
                    {
                        filterCategories?.map((description, index) => {
                            return (
                                <CardCategoria key={index} 
                                    nome={description}
                                    apagar={removeFilterCategories}
                                />
                            )
                        })
                    }                
                </Box>
                <button className="border border-violet-200 rounded-xl rounded-l-none"
                onClick={handleClick}
                >
                <ArrowDropDownSharpIcon />
                </button>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                    <Box sx={{ border: 1, p: 1, display: 'flex', flexDirection:'column' , bgcolor: '#ffffff' }}>
                        {categorias.map((categoria) => {
                            return (
                                <button  className="hover:bg-gray-300 w-full"
                                    key={categoria.id} 
                                    onClick={ clickItem }
                                >{categoria.description}</button>
                            )
                        })}
                    </Box>
                </Popper>                
            </div>
            <span className="text-xs col-end-7 col-span-3 cursor-pointer" onClick={tudo}>Selecionar Todas</span>
            <span className="text-xs col-span-3 cursor-pointer" onClick={limpar}>Limpar Todas</span>
        </div>
    )
}

export default SelectCategorias