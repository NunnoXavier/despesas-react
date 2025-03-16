// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MyProvider } from './services/usecontext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <MyProvider>
    <App />
  </MyProvider>

    // </StrictMode>,
)
