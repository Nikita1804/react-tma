import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import App from './components/Layout/App.tsx'

import './styles/drag-drop.css'
import './styles/blocks.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
            <App />
  </StrictMode>,
)
