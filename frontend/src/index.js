import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css';
import store from './store';
import { Provider } from 'react-redux';
import { AlertProvider, AlertTemplate, options } from './components/layouts/Alert/Alert';

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);