import Menu from "./components/Menu/Menu"
import MappedRoutes from "./Routes"
 import Filtros from "./components/Filtros/Filtros"

function App() {  
  
  return (
    <div className="grid grid-cols-12 bg-violet-900 text-violet-200">
      <div className="col-span-2">
        <Menu />
      </div>

      <div className="col-span-10 bg-slate-100 text-slate-800 min-h-dvh">
        <Filtros className="mb-4" />
        <MappedRoutes />
      </div>

      <div className="col-span-12 bg-violet-900 text-violet-200">
        rodape
      </div>
  </div>
  )
}

export default App