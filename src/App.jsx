import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'

class App extends Component {


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
