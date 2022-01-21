import React from 'react'
import ReactDOM from 'react-dom'
import 'core-js/stable'
import './polyfills'
import './index.css'
import App from './app'
import reportWebVitals from './report-web-vitals'
import * as Wails from '@wailsapp/runtime'

/**
TODO:
- Investigate input type file for import path
- Tests
- make validation DRY
*/

Wails.Init(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
