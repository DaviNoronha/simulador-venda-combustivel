import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import Index from './pages/Index'
import { AppRoutes } from './Routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
