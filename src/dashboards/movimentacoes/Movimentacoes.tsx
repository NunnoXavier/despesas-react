import { styled } from "@mui/material"
import useDate from "../../utils/useDate"
import useCurrency from "../../utils/useCurrency"
import { Table, Head, Row, HeadRow } from "../../components/Table/Table"
import useMyContext from "../../services/usecontext"
import { DeleteForeverRounded as Apagar } from '@mui/icons-material'
import { MouseEventHandler } from "react"
import { Movimentacao } from "../../services/type"

const STh = styled('th')(() => ({
    // background: '#33dd77',
    padding: "0px 0px 0px 10px",
    textAlign: "start",
    border: "2px solid #f1f5f9"
}))

const STd = styled('td')(() => ({
    border: "2px solid #f1f5f9"
}))

type MovimentacoesProps = {
    ClassName?: string
}

const Movimentacoes = (props: MovimentacoesProps) =>{
    const { movimentacoesFiltro, loadingMovimentacoes, errorMovimentacoes, deleteMovimentacao } = useMyContext()


        
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

    const apagar:MouseEventHandler<SVGSVGElement> = async(e) => {
        const celula = e.currentTarget.parentElement as HTMLElement
        const  linha = celula.parentElement as HTMLTableRowElement
        const index = linha.rowIndex 
        const mov:Movimentacao = movimentacoesFiltro[index -1]

        if(confirm(
            `Tem certeza que deseja apagar permanentemente o registro
            "${ mov.description }" no valor de R$${ mov.amount.toFixed(2) }`
            )
        ){
            deleteMovimentacao(mov.id)
        }
    }        

    return(
        <div className={ `  ${props.ClassName}` }>
            <div className="text-center">
                <h1 className="text-xl font-bold">Movimentações</h1>
            </div>
            
            <Table>
                    <Head>
                        <HeadRow className="bg-cyan-800 text-slate-100">
                            <STh></STh>
                            <STh>Data</STh>
                            <STh>Descrição</STh>
                            <STh>Valor</STh>                        
                            <STh>Categoria</STh>                        
                            <STh>Conta</STh>                        
                        </HeadRow>
                    </Head>
                <tbody>
                {
                    movimentacoesFiltro
                    .sort((a,b) => a.data < b.data? 1 : -1)
                    .map(( trans ) => (
                        <Row 
                            key={ trans.id }
                            
                        >
                            <STd><Apagar onClick={apagar} color="error" fontSize="small" /></STd>
                            <STd>{useDate.dateBr( trans.data )}</STd>
                            <STd>{trans.description}</STd>
                            <STd 
                                className={ `${ trans.category?.type == "D"? "text-red-800" : "text-blue-800" }` }
                            >
                                {
                                    `${trans.category?.type == "D"? "-" : "+"} 
                                    ${useCurrency.toBR(trans.amount) }` 
                                }
                            </STd>
                            <STd>{trans.category?.description}</STd>
                            <STd>{trans.account?.description}</STd>

                        </Row>
                    ))
                }

                </tbody>
            </Table>
            
        </div>
    )
}

export default Movimentacoes