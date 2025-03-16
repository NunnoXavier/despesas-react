type MenuProps = {
    className?: string
}

const Menu = ( props: MenuProps ) => {
    return (
        <div className={` py-5 pl-5 [&_ul]:pl-5 font-serif${props.className}`}>
            <h1 className="text-2xl font-bold pb-5">MENU</h1>
            <ul className="**:font-semibold **:pb-2">
                <li>
                    <a href="/"  className="no-underline">Home</a>
                </li>
                <li>
                    Inserir
                    <ul>
                        <li>
                            <a href="/contas/inserir" className="no-underline">Conta</a>                            
                        </li>
                        <li>
                            <a href="/categorias/inserir" className="no-underline">Categoria</a>                            
                        </li>
                        <li>
                            <a href="/movimentacoes/inserir" className="no-underline">Movimentação</a>                            
                        </li>

                    </ul>
                </li>
                <li>
                    <a href="/movimentacoes/transferencia">Transferência entre Contas</a>
                </li>
            </ul>
        </div>
    )
}

export default Menu