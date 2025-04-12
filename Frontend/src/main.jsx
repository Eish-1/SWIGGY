import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './index.css'
// import App from './App.jsx' // No longer use App.jsx directly
import AppRouter from './AppRouter'; // Import the correct router

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Render AppRouter instead of App */}
      <AppRouter />
    </Provider>
  </React.StrictMode>,
)
