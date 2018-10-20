import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login.jsx'
import Home from './components/Home.jsx'

class App extends Component {
  state = {
    coords: []
  }
  componentDidMount() {

    axios.get("http://localhost:8080/",{
      params: {
        ID: 12345
      }
    })
      .then(res => {
        this.setState({coords:res.data})
        //console.log(this.state)
      })
  }

  render() {
    console.log(this.state)
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
        </Switch>
     </Router>

    );
  }
}

export default App;
