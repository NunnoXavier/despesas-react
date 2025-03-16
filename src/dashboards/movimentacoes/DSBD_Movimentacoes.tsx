import Movimentacoes from "./Movimentacoes"
import Categorias from "./Categorias"
import Contas from "./Contas"

const DSBDMovimentacoes = () => {
    return (
        <section className="p-2 bg-slate-100">
            <div className="w-full text-center">
                {/* <h3>Resumo de Movimentações</h3> */}
            </div>
            <div className="p-2 grid grid-cols-12 space-x-2 space-y-2">       
                <Categorias ClassName="col-span-7 max-h-96 mb-3 overflow-scroll" />
                <Contas ClassName="col-span-5 max-h-96 mb-3 overflow-scroll" />                
                <Movimentacoes ClassName="col-span-12 max-h-96 overflow-scroll" />

            </div>
        </section>
    )
}

export default DSBDMovimentacoes