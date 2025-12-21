import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main_Page from './Main_Page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main_Page />
  </StrictMode>,
)
