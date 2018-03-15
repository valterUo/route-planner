import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'


const renderApp = () => {
    ReactDOM.render(<App store = {store} />, document.getElementById('root'))
  }

  renderApp()
  store.subscribe(renderApp)
