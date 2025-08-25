import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* THis means we can use routing in our application */}
    <BrowserRouter> 
      <App />    
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
