import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import InserirMov from './pages/movimentacoes/Inserir'
import InserirCat from './pages/Categorias/Inserir'
import InserirCon from './pages/Contas/Inserir'
import Trans from './pages/movimentacoes/Transferencia'

const MappedRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' Component={Home}/>
                <Route path='/movimentacoes/inserir' Component={InserirMov }/>
                <Route path='/categorias/inserir' Component={InserirCat }/>
                <Route path='/contas/inserir' Component={InserirCon }/>
                <Route path='/movimentacoes/transferencia' Component={Trans }/>
            </Routes>
        </Router>

    )
}

export default MappedRoutes
