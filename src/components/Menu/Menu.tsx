import { useState } from "react"
import HomeIcon from '@mui/icons-material/Home'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MoveUpIcon from '@mui/icons-material/MoveUp'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CategoryIcon from '@mui/icons-material/Category'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { useSearchParams } from "react-router-dom"

type MenuProps = {
    className?: string
}


const Menu = ( props: MenuProps ) => {
    const [open, setOpen ] = useState(false)
    const [ searchParams ] = useSearchParams()

    const irPara = (caminho:string) => {
        return caminho + '?' + searchParams.toString()
    }

    return (
        <div className={` py-5 pl-5 text-cyan-100 font-serif${props.className}`}>
            <h1 className="text-2xl font-bold pb-5">MENU</h1>
            <div className="**:font-semibold flex flex-col">
                <div className="flex gap-3 items-center">
                    <HomeIcon /> <a href={irPara("/")}  className="no-underline my-3">Home</a>
                </div>
                <button  
                    className="flex gap-3 items-center my-3 cursor-pointer" 
                    onClick={() => setOpen(!open)}
                ><AddCircleOutlineIcon /> Inserir
                </button>
                <div className={`${open? 'h-auto': 'h-0'} overflow-hidden`}>
                    <div className={`grid  transition-all duration-300 ease-in-out
                            ${open? 'grid-rows[1fr] opacity-100' : 'grid-rows[0fr] opacity-0'}
                        `}
                    >
                        <div className="flex gap-3 items-center mb-3 ml-4">
                            <AccountBalanceIcon /><a href={irPara("/contas/inserir")} className="no-underline">Conta</a>                            
                        </div>
                        <div className="flex gap-3 items-center mb-3 ml-4">
                            <CategoryIcon /><a href={irPara("/categorias/inserir")} className="no-underline ">Categoria</a>                            
                        </div>
                        <div className="flex gap-3 items-center mb-3 ml-4">
                            <CurrencyExchangeIcon /><a href={irPara("/movimentacoes/inserir")} className="no-underline ">Movimentação</a>                            
                        </div> 
                    </div>
                </div>
                <div className="flex gap-3 items-center my-3">
                <MoveUpIcon /> <a href={irPara("/movimentacoes/transferencia")}>Transferências</a>
                </div>
            </div>
        </div>

    )
}

export default Menu