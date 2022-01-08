import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css';
import store from './store';
import { Provider } from 'react-redux';
import { AlertProvider, AlertTemplate, options } from './components/layouts/Alert/Alert';
import TimeAgo from 'javascript-time-ago'
import en_IN from 'javascript-time-ago/locale/en-IN.json'

TimeAgo.addDefaultLocale(en_IN);
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);