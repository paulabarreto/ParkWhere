import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import NavBar from './components/Nav.jsx'
import Map from './components/Map.jsx'
import Login from './components/Login.jsx'

class App extends Component {

  componentDidMount() {
    console.log('HI')
    axios.get("http://0.0.0.0:8080/",{
      params: {
        ID: 12345
      }
    })
      .then(res => {
      })
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Map />

          <Switch>
            <Route path='/login' component={Login} />
          </Switch>
      </div>
     </Router>


    );
  }
}

export default App;
