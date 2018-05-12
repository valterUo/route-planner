import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import './index.css'
import App from './App' // eslint-disable-line
import store from './store'
import { Provider } from 'react-redux' // eslint-disable-line


const renderApp = () => {
	ReactDOM.render(
		<Provider store = {store}>
			<App store = {store}/>
		</Provider>,
		document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
