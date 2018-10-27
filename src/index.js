import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App.jsx';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
