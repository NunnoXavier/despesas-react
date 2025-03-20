import useInserirMov from '../../services/movimentacoes/useInserirMov'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from "../../components/Button/Button"
import Movimentacoes from "../../dashboards/movimentacoes/Movimentacoes"
import useCurrency from '../../utils/useCurrency'

const InserirMov = () => {
    const { id, movimentacoes, setId, description, setDescr, data, setData,
        amount, setValor, descrCategoria, setCategoria, descrConta, setConta,
        salvar, mensagem, corMensagem, modo, categorias, contas } = useInserirMov()

    return (
        <div className="bg-slate-100 min-h-5/6 rounded-b-2xl">
            <h3 className="text-2xl font-bold text-center">{modo === 'INSERIR'? 'Inserir ' : 'Alterar '} Movimentação</h3>
            <div className="grid grid-cols-12 px-4 gap-4">
                <Input 
                    id="id" 
                    label="ID"
                    bg="bg-slate-100"
                    type="number"
                    readOnly 
                    className={`
                        col-start-1 col-span-2
                        ${ modo === "INSERIR"? 'text-slate-400' : 'text-cyan-600' }
                    `}
                    value={id}
                    onChange={(e) => setId(e.currentTarget.value)}
                    />
                
                <Input 
                    id="descr" 
                    label="Descrição"
                    type="text"
                    bg="bg-slate-100"
                    className={`
                        col-start-1 col-span-7
                        ${ modo === "INSERIR"? 'text-slate-400' : 'text-cyan-600' }
                    `}
                    value={description}
                    onChange={(e) => setDescr(e.currentTarget.value)}                    
                    />
                
                <Input 
                    id="date" 
                    type="date" 
                    label="Data"
                    bg="bg-slate-100" 
                    className={`
                        col-start-1 col-span-3
                        ${ modo === "INSERIR"? 'text-slate-400' : 'text-cyan-600' }
                    `}
                    value={data.slice(0,10)}
                    onChange={(e) => setData(e.currentTarget.value.slice(0,10))}                                    
                    />
                
                <Input 
                    id="amount" 
                    type="number" 
                    label="Valor"
                    bg="bg-slate-100" 
                    className={`
                        col-start-1 col-span-3
                        ${ modo === "INSERIR"? 'text-slate-400' : 'text-cyan-600' }
                    `}
                    value={amount}
                    onChange={
                        (e) => setValor(useCurrency.maskCurrency(e.currentTarget.value))
                    }
                    />

                <Select                      
                    className={`
                        col-start-1 col-span-5
                        ${ modo === "INSERIR"? 'text-slate-400' : 'text-cyan-600' }
                    `}
                    value={descrCategoria}
                    onChange={(e) => setCategoria(e.currentTarget.selectedOptions[0].value)}
                    label="Categoria"
                    bg="bg-slate-100"                     
                    >
                        <option value={0}></option>   
                        {
                            categorias.map((cat) => {
                                return (
                                    <option key={cat.id} value={cat.id} >{cat.description}</option>
                                )
                            })
                        }
                </Select>    

                <Select 
                    className={`
                        col-start-1 col-span-5
                        ${ modo === "INSERIR"? 'text-slate-400' : 'text-cyan-600' }
                    `}
                    value={descrConta}
                    label="Conta"
                    bg="bg-slate-100"
                    onChange={(e) => setConta(e.currentTarget.selectedOptions[0].value)}
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
                    className={`
                        col-start-1 col-span-2 text-slate-100
                        ${ modo === "INSERIR"? 'bg-green-600' : 'bg-cyan-600' }
                    `}
                    onClick={salvar}
                >
                    { modo === "INSERIR"? 'Inserir' : 'Alterar' }
                </Button>
                <Button 
                    className={`
                        text-slate-100 col-span-2 border bg-gray-400 rounded-md 
                        ${ modo === 'INSERIR'? 'hidden' : 'block' }
                    `}
                    onClick={()=>setId('0')}
                >
                    Nova Movimentação
                </Button>


            </div>

            <div className={`text-center p-10 m-2`}>
                <p className={`font-bold 
                    ${ corMensagem === "sucess"? 'text-blue-600' : 
                       corMensagem === "alert"? 'text-yellow-600' :
                                                'text-red-500'
                    }`}>{ mensagem }</p>
            </div>

            <div className="grid grid-cols-12 invisible md:visible">
                <Movimentacoes 
                className="col-span-12 md:col-span-10 md:col-start-2" 
                movimentacoes={movimentacoes}
                edit
                editar={(mov) => setId(mov.id.toString())}
                />
            </div>
        </div>
    )
}

export default InserirMov