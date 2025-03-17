const CardCategoria = ({nome, apagar}: { nome:string, apagar: (nome: string) => void }) => {

    const apagarNome = () => {
        apagar(nome)
    }

    return (
        <div className="flex text-sm text-slate-100 rounded-lg bg-gray-400
                        whitespace-nowrap pl-2 pr-3 relative hover:[&>a]:text-gray-600">
            <a className="text-xs absolute right-1 -top-1 text-transparent cursor-pointer" onClick={apagarNome}>x</a>
            { nome }
        </div>
    )

}

export default CardCategoria