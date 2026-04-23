import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { InvoiceProvider } from './component/data/InvoiceProvider.jsx'

createRoot(document.getElementById('root')).render(
  <InvoiceProvider>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </InvoiceProvider>
)
