import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/AppRoutes'
import { store } from '@/provider/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
