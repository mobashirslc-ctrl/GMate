import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App'; 

// Error line thik korun:
// Jodi file-ti styles folder-e thake:
import './styles/index.css'; 

// NOTE: Jodi index.css namer kono file na thake, 
// tobe check korun globals.css ba tailwind.css ache kina:
// import './styles/globals.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);