import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootswatch/dist/zephyr/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js'
import './index.css'
import './style-couleur.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
