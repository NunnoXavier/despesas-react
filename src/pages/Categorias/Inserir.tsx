import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from "../../components/Button/Button"
import useInserirCat from '../../services/categorias/useInserirCat'

const InserirCat = () => {

    const { id, description, type, mensagem ,salvar, 
            setDescr, setId, setType } = useInserirCat()

    return (
        <div className="bg-slate-100">
            <h3 className="text-2xl font-bold text-center">Inserir Categoria</h3>
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
                
                <Select
                    label="Tipo"
                    bg="bg-slate-100"
                    className="col-start-1 col-span-7"
                    value={type}
                    onChange={setType}
                >
                    <option value="C">Crédito</option>
                    <option value="D">Débito</option>
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
                <p className={`font-bold text-red-500`}>{ mensagem }</p>
            </div>
        </div>
    )
}

export default InserirCat