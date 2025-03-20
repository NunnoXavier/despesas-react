import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from "../../components/Button/Button"
import useInserirCat from '../../services/categorias/useInserirCat'
import useMyContext from '../../services/usecontext'
import useCurrency from '../../utils/useCurrency'
import { DeleteForeverRounded as Apagar } from '@mui/icons-material'
import Editar from '@mui/icons-material/Edit'
import { useRef } from 'react'
import { Category } from '../../services/type'

const InserirCat = () => {

    const { id, description, type, mensagem ,salvar, 
            setDescr, setId, setType, modo, categorias, corMensagem } = useInserirCat()
    const { movimentacoes, deleteCategoria } = useMyContext()
    const idRef = useRef<HTMLInputElement>(null)

    const handleDelete = (categoria: Category) => {
        if(!confirm(`Confirma deletar a Categoria ${categoria.description}?`)) return
        
        if(movimentacoes.filter((mov) => mov.idcategory === categoria.id).length > 0){
            if(!confirm(`Existem movimentações vinculadas á categoria ${categoria.description},
                se ela for deletada TODAS as movimentações vinculadas a ela também serão.
                Deseja deletar mesmo assim?`)) return
        }

        deleteCategoria(categoria)
    }

    return (
        <div className="bg-slate-100 ">
            <h3 className="text-2xl font-bold text-center">
                {modo==='INSERIR'? 'Inserir' : 'Alterar'} Categoria
            </h3>
            <div className="grid grid-cols-12 px-4 gap-4">
                <Input 
                    id="id" 
                    ref={idRef}
                    label="ID"
                    bg="bg-slate-100"
                    type="number" 
                    readOnly
                    className={`
                        col-start-1 col-span-2
                        ${modo==='ALTERAR'? 'text-cyan-600':'text-slate-400'}
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
                        ${modo==='ALTERAR'? 'text-cyan-600':'text-slate-400'}
                    `}
                    value={description}
                    onChange={(e) => setDescr(e.target.value)}                    
                    />
                
                <Select
                    label="Tipo"
                    bg="bg-slate-100"
                    className={`
                        col-start-1 col-span-7
                        ${modo==='ALTERAR'? 'text-cyan-600':'text-slate-400'}
                    `}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="C">Crédito</option>
                    <option value="D">Débito</option>
                </Select>                

                <Button
                    className={`
                        col-start-1 col-span-2 text-slate-100
                        ${modo==='ALTERAR'? 'bg-cyan-800' : 'bg-emerald-800'}
                    `}
                    onClick={salvar}
                >
                    {modo==='INSERIR'? 'Inserir' : 'Alterar'}
                </Button>
                <Button 
                    className={`
                        col-span-2 bg-slate-400 text-slate-100 rounded-md
                        ${modo==='INSERIR'? 'hidden':'block'}
                    `}
                    onClick={() => setId("0")}
                >
                    Nova Categoria
                </Button>
            </div>

            <div className={`text-center p-10 m-2`}>
                <p className={`
                    font-bold ${ corMensagem === 'sucess'? 'text-blue-500'  :
                                 corMensagem === 'alert'? 'text-yellow-500' :
                                                           'text-red-500'
                     }
                    `}>{ mensagem }</p>
            </div>

            <div className='m-4'>
                <h1 className='text-lg font-bold text-center mb-5'>Lista de Categorias</h1>
                {
                    categorias
                    .sort((a,b) => a > b? 1: 0)
                    .map((categoria) => {
                        const movVinculados = movimentacoes.filter((mov) => mov.idcategory === categoria.id)
                        const total = movVinculados.reduce((prev, curr) => prev + curr.amount , 0)
                        return(
                        <div key={categoria.id} className='border-t border-slate-300 p-2 grid grid-cols-12 items-center'>
                            <h3 className='col-span-1'>{categoria.id}. </h3>
                            <div className='col-span-3'>
                                <h3 className=''>{categoria.description}</h3>
                                <h4 className='font-semibold text-sm text-slate-400'>
                                    { categoria.type === 'C'? 'Crédito':'Débito'}
                                </h4>
                            </div>
                            <p className='col-span-2 text-xs text-slate-400 '>
                                    {`Total: ${ useCurrency.toBR(total) }`}
                            </p>
                            <p className='col-span-2 text-xs text-slate-400 '>
                                {`${ movVinculados.length } movimentações`}
                            </p>
                            <div className='col-span-4 flex justify-end'>
                                <div className='flex flex-col items-start text-xs'>
                                    <p>
                                        <Editar 
                                            onClick={() => {
                                                setId(categoria.id.toString())
                                                idRef.current?.focus()
                                            }} 
                                            fontSize='small' className='text-slate-500'
                                        />
                                        <span className='text-slate-400'>editar</span>
                                    </p>
                                    <p>
                                        <Apagar 
                                            fontSize='small' className='text-slate-500'
                                            onClick={() => handleDelete(categoria)}
                                        />
                                        <span className='text-slate-400'>deletar</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}

export default InserirCat