import Input from '../../components/Input/Input'
import Button from "../../components/Button/Button"
import useInserirCon from '../../services/contas/useInserirConta'
import useCurrency from '../../utils/useCurrency'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'


const InserirCon = () => {

    const { id, description, mensagem, totaisContas, salvar, setDescr, setId, deletar } = useInserirCon()

    // const { contas, fetchContas } = useContas()


    
    return (
        <div className="bg-slate-100">
            <h3 className="text-2xl font-bold text-center">Inserir Conta</h3>
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
                    className="col-start-1 col-span-6"
                    value={description}
                    onChange={setDescr}                    
                    />
                
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
                <p className={`font-bold text-red-500`}>{ mensagem }</p>
            </div>

            <div className='flex w-full justify-center'>
                <div className="w-11/12 border border-slate-300 rounded-lg p-4">
                    <h2 className='text-center text-lg font-black mb-2'>Lista de Contas</h2>
                    <div className='grid md:grid-cols-3 gap-4'>
                        {
                            totaisContas.map((conta) => (
                                <div key={conta.id} className="col-span-1 shadow-lg rounded-md p-2">
                                    <div className='flex space-x-4 justify-between items-center mb-2'>
                                        <div className="text-slate-400">
                                            <AccountBalanceIcon />
                                        </div>
                                        <h3 className=' font-semibold text-slate-500'>
                                            { conta.description }
                                        </h3>
                                        <div>
                                        <span className=' text-sm text-slate-400'>ID: { conta.id }</span>
                                        </div>
                                    </div>
                                    
                                    <div className='flex justify-evenly'>
                                        
                                        <span className=' text-sm text-slate-400'>Saldo: { useCurrency.toBR(conta.sum) }</span>
                                    </div>
                                    <div className='text-xs flex justify-evenly space-x-2 items-center w-full mt-2'>
                                        <button 
                                            className='text-sky-600 hover:text-sky-400'
                                            onClick={() => {}}
                                        >
                                            <EditIcon fontSize='small'/> editar
                                        </button>
                                        <button 
                                            className='text-red-400 hover:text-red-200'
                                            onClick={() => deletar(conta)}
                                        >
                                            <DeleteIcon fontSize='small'/> deletar
                                        </button>
                                    </div>                          
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InserirCon