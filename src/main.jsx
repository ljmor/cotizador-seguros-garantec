import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Landing } from './Landing.jsx'
import  Salud  from './formulario/salud.jsx'
import Registro from './formulario/registro.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Landing /> */}
    {/* <Salud /> */}
    <Registro />
  </StrictMode>,
)
