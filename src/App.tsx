import Menu from "./components/Menu/Menu"
import MappedRoutes from "./Routes"
 import Filtros from "./components/Filtros/Filtros"

function App() {  
  
  return (
    <div className="grid grid-cols-12 bg-gradient-to-br from-purple-700 from-0% to-purple-950 to-40% text-violet-200">
      <div className="col-span-2">
        <Menu />
      </div>

      <div className="col-span-10 text-slate-800 min-h-dvh">
        <Filtros className="mb-4" />
        <MappedRoutes />
      </div>

      <div className="col-span-12 text-violet-200">
        rodape
      </div>
  </div>
  )
}

export default App