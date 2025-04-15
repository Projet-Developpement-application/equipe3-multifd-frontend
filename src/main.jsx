import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootswatch/dist/yeti/bootstrap.min.css";
import './index.css'
import './style-couleur.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
