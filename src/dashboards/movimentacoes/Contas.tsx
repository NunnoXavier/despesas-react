import useCurrency from "../../utils/useCurrency"
import { Table, Head, Row, HeadRow } from "../../components/Table/Table"
import useMyContext from "../../services/usecontext"

type ContasProps = {
    ClassName?: string,
}

const Contas = (props: ContasProps) =>{
    const { movimentacoes, totalizarContas, loadingContas, errorContas } = useMyContext()

    if(loadingContas){
        //trocar por um placeholder
        return (
                <h1>Carregando Contas</h1>
        )
    }

    if(errorContas){
        console.log(errorContas)
        return (
                <h1>Erro ao carregar Contas</h1>
        )
    }

    const sumAccounts = totalizarContas(movimentacoes)    

    return(
        <div className={ `  ${props.ClassName}` }>
            <div className="text-center">
                <h1 className="text-xl font-bold">Contas</h1>
            </div>
            
            <Table>
                    <Head>
                        <HeadRow className="bg-cyan-800 text-slate-100">
                            <th>Descrição</th>
                            <th>Saldo</th>                        
                        </HeadRow>
                    </Head>
                <tbody>
                {
                    sumAccounts.map(( acc ) => (
                        <Row key={ acc.id } >
                            <td>{acc.description}</td>
                            <td 
                                className={ `${ acc.sum < 0? "text-red-800" : "text-blue-800" }` }
                            >
                                {
                                    useCurrency.toBR(acc.sum) 
                                }
                            </td>

                        </Row>
                    ))
                }

                </tbody>
            </Table>
            
        </div>
    )
}

export default Contas