import { useEffect } from "react"
import useContas from "../../services/contas/useContas"
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from "../../components/Button/Button"
import useTrans from "../../services/movimentacoes/useTrans"

const Transferencia = () => {

    const { contas, fetchContas  } = useContas()    
    const { data, setData,
        amount, setValor, descrContaOrigem, setContaOrigem,
        descrContaDestino, setContaDestino, salvar, mensagem } = useTrans()

    useEffect(() =>{
        fetchContas()
    },[])

    return (
        <div className="">
            <h3 className="text-2xl font-bold text-center">Transferência entre contas</h3>
            <div className="grid grid-cols-12 px-4 gap-4">         
                <Input 
                    id="date" 
                    type="date" 
                    label="Data"
                    bg="bg-slate-100" 
                    className="col-start-1 col-span-3"
                    value={data.slice(0,10)}
                    onChange={setData}                                    
                    />
                
                <Input 
                    id="amount" 
                    type="number" 
                    label="Valor"
                    bg="bg-slate-100" 
                    className="col-start-1 col-span-3"
                    value={amount}
                    onChange={setValor}
                    />

                <Select 
                    className="col-start-1 col-span-5" 
                    value={descrContaOrigem}
                    label="Conta de Origem"
                    bg="bg-slate-100"
                    onChange={setContaOrigem}
                    >
                    <option value={0}></option>
                    {
                            contas.map((con) => {
                                return (
                                    <option key={con.id} value={con.id} >{con.description}</option>
                                )
                            })
                        }
                </Select>

                <Select 
                    className="col-start-1 col-span-5" 
                    value={descrContaDestino}
                    label="Conta de Destino"
                    bg="bg-slate-100"
                    onChange={setContaDestino}
                    >
                    <option value={0}></option>
                    {
                            contas.map((con) => {
                                return (
                                    <option key={con.id} value={con.id} >{con.description}</option>
                                )
                            })
                        }
                </Select>
                
                <Button
                    className="col-start-1 col-span-2" 
                    onClick={salvar}
                >
                    Transferir
                </Button>
                <Button 
                    className="col-span-2 border border-gray-400 rounded-md" 
                >
                    Cancelar
                </Button>


            </div>

            <div className={`text-center p-10 m-2`}>
                <p className={`font-bold text-red-500`}>{ mensagem }</p>
            </div>
        </div>
    )
}

export default Transferencia