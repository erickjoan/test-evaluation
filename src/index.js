import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/layout/styles.css'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './app/layout/App'
import reportWebVitals from './reportWebVitals'
import configureStore from './app/store/configureStore'
import ScrollToTop from './components/common/ScrollToTop'

// eslint-disable-next-line no-console
console.log(`The app is running on ${process.env.REACT_APP_ENV}`)

const history = createBrowserHistory()

const store = configureStore()

const rootEl = document.getElementById('root')

const app = (
  <Provider store={store}>
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>
)

ReactDOM.render(app, rootEl)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
export default history
