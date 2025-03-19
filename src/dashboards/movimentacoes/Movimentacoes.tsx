import useDate from "../../utils/useDate"
import useCurrency from "../../utils/useCurrency"
import { Table, Head, Row, HeadRow } from "../../components/Table/Table"
import useMyContext from "../../services/usecontext"
import { DeleteForeverRounded as Apagar } from '@mui/icons-material'
import Editar from '@mui/icons-material/Edit'
import { Movimentacao } from "../../services/type"

type MovimentacoesProps = {
    className?: string,
    edit?: boolean,
    movimentacoes?: Movimentacao[],
    editar?: (mov:Movimentacao) => void
}

const Movimentacoes = (props: MovimentacoesProps) =>{
    const { movimentacoesFiltro, loadingMovimentacoes, errorMovimentacoes, 
        deleteMovimentacao } = useMyContext()
            
    if(loadingMovimentacoes){
        //trocar por um placeholder
        return (
                <h1>Carregando Transacoes</h1>
        )
    }

    if(errorMovimentacoes){
        console.log(errorMovimentacoes)
        return (
                <h1>Erro ao carregar Transacoes</h1>
        )
    }

    const linhas = props.movimentacoes? props.movimentacoes : movimentacoesFiltro

    const apagar = (registro:Movimentacao) => {
        const mov = registro
        if(confirm(
            `Tem certeza que deseja apagar permanentemente o registro
            "${ mov.description }" no valor de R$${ mov.amount.toFixed(2) }`
            )
        ){
            deleteMovimentacao(mov.id)
        }
    }        
    
    return(
        <div className={ `  ${props.className}` }>
            <div className="text-center">
                <h1 className="text-xl font-bold">Movimentações</h1>
            </div>
            
            <Table>
                    <Head>
                        <HeadRow className="bg-cyan-800 text-slate-100">
                            <th className={`
                                pl-2 border-r-2 border-slate-100 text-cyan-800
                                ${ props.edit? 'block' : 'hidden' }
                            `}>...</th>
                            <th className="pl-2 border-r-2 border-slate-100">Data</th>
                            <th className="pl-2 border-r-2 border-slate-100">Descrição</th>
                            <th className="pl-2 border-r-2 border-slate-100">Valor</th>                        
                            <th className="pl-2 border-r-2 border-slate-100">Categoria</th>                        
                            <th className="pl-2 ">Conta</th>                        
                        </HeadRow>
                    </Head>
                <tbody>
                {
                    linhas
                    .sort((a,b) => a.data < b.data? 1 : 
                                   a.id > b.id? 1 : -1)
                    .map(( mov ) => (
                        <Row 
                            key={ mov.id }
                            
                        >
                            <td className={`
                                pl-2 border-r-2 border-slate-100
                                ${ props.edit? 'block' : 'hidden' }
                            `}>
                                <Apagar onClick={() => apagar(mov)} color="error" fontSize="small" />
                                <Editar onClick={ () => props.editar && props.editar(mov) }/>
                            </td>
                            <td className="pl-2 border-r-2 border-slate-100">{useDate.dateBr( mov.data )}</td>
                            <td className="pl-2 border-r-2 border-slate-100">{mov.description}</td>
                            <td className={`
                                pl-2 border-r-2 border-slate-100
                                ${ mov.category?.type == "D"? "text-red-800" : "text-blue-800" }
                            `}
                            >
                                {
                                    `${mov.category?.type == "D"? "-" : "+"} 
                                    ${useCurrency.toBR(mov.amount) }` 
                                }
                            </td>
                            <td className="pl-2 border-r-2 border-slate-100">{mov.category?.description}</td>
                            <td>{mov.account?.description}</td>

                        </Row>
                    ))
                }

                </tbody>
            </Table>
            
        </div>
    )
}

export default Movimentacoes