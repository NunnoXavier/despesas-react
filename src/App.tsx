import { BrowserRouter as Router } from 'react-router-dom'
import Menu from "./components/Menu/Menu"
import MappedRoutes from "./Routes"
import Filtros from './components/Filtros/Filtros'
import { MyProvider } from './services/usecontext.tsx'

function App() {  
  
  return (
    <Router>
      <MyProvider>
        <div className="grid grid-cols-12 bg-gradient-to-br from-slate-800 from-25% to-cyan-200 to-90% text-slate-700">
          <div className="col-span-2">
            <Menu />
          </div>

          <div className="col-span-10 min-h-screen bg-slate-100">
              <Filtros className="" />
              <MappedRoutes />
          </div>

          <div className="col-span-12">
            rodape
          </div>
        </div>
      </MyProvider>
  </Router>
  )
}

export default App