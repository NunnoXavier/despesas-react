import useCurrency from "../../utils/useCurrency"
import { Table, Head, Row, HeadRow } from "../../components/Table/Table"
import useMyContext from "../../services/usecontext"
import { styled } from "@mui/system"

type ContasProps = {
    ClassName?: string,
}

const STh = styled('th')(() => ({
    border: "2px solid #f1f5f9",
    borderTop: "2px solid oklch(0.45 0.085 224.283)",
    ":firstOfType":{
        borderLeft: "2px solid oklch(0.45 0.085 224.283)",
    },
    "::lastOfType":{
        borderRight: "2px solid oklch(0.45 0.085 224.283)",
    }
}))

const STd = styled('td')(() => ({
    border: "2px solid #f1f5f9",
}))

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
                            <STh>Descrição</STh>
                            <STh>Saldo</STh>                        
                        </HeadRow>
                    </Head>
                <tbody>
                {
                    sumAccounts.map(( acc ) => (
                        <Row key={ acc.id } >
                            <STd>{acc.description}</STd>
                            <STd 
                                className={ `${ acc.sum < 0? "text-red-800" : "text-blue-800" }` }
                            >
                                {
                                    useCurrency.toBR(acc.sum) 
                                }
                            </STd>

                        </Row>
                    ))
                }

                </tbody>
            </Table>
            
        </div>
    )
}

export default Contas