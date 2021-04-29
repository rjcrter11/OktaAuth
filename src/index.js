import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react'
import App from './App';
import reportWebVitals from './reportWebVitals';

const oktaConfig = {
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  redirect_url: `${window.location.origin}/login/callback`,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Security {...oktaConfig} >
        <App />
      </Security  >
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (module.hot) module.hot.accept()