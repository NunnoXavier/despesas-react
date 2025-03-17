import { useEffect } from "react"
import useCategorias from "../../services/categorias/useCategorias"
import useContas from "../../services/contas/useContas"
import useInserirMov from '../../services/movimentacoes/useInserirMov'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from "../../components/Button/Button"

const InserirMov = () => {

    const { categorias, fetchCategorias  } = useCategorias()
    const { contas, fetchContas  } = useContas()    
    const { id, setId, description, setDescr, data, setData,
        amount, setValor, descrCategoria, setCategoria, descrConta, setConta,
        salvar, mensagem, corMensagem } = useInserirMov()

    useEffect(() =>{
        fetchCategorias()
        fetchContas()
    },[])

    return (
        <div className="bg-slate-100 min-h-5/6 rounded-b-2xl">
            <h3 className="text-2xl font-bold text-center">Inserir Movimentação</h3>
            <div className="grid grid-cols-12 px-4 gap-4">
                <Input 
                    id="id" 
                    label="ID"
                    bg="bg-slate-100"
                    type="number" 
                    className="col-start-1 col-span-2"
                    value={id}
                    onChange={setId}
                    />
                
                <Input 
                    id="descr" 
                    label="Descrição"
                    type="text"
                    bg="bg-slate-100" 
                    className="col-start-1 col-span-7"
                    value={description}
                    onChange={setDescr}                    
                    />
                
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
                    value={descrCategoria}
                    onChange={setCategoria}
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
                    className="col-start-1 col-span-5" 
                    value={descrConta}
                    label="Conta"
                    bg="bg-slate-100"
                    onChange={setConta}
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
                    Inserir
                </Button>
                <Button 
                    className="col-span-2 border border-gray-400 rounded-md" 
                >
                    Cancelar
                </Button>


            </div>

            <div className={`text-center p-10 m-2`}>
                <p className={`font-bold text-${ corMensagem }-500`}>{ mensagem }</p>
            </div>
        </div>
    )
}

export default InserirMov