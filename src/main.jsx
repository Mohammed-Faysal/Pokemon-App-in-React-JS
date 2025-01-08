import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RouterProvider } from 'react-router-dom'
import { rootRouter } from './Router/RootRouter.jsx'
import SearchBarCtx from './Context/SearchBarCtx.jsx';
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchBarCtx>
      <RouterProvider router={rootRouter}>
          <App />
      </RouterProvider>
      <ToastContainer/>
    </SearchBarCtx>
  </React.StrictMode>,
)
