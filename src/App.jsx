import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }
  }

  handleLogin = username => {
    this.setState({username: username})
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} username={this.state.username} /> } />
          <Route path='/login' render={(props) => <Login {...props} login={this.handleLogin} />} />
        </Switch>
     </Router>

    );
  }
}

export default App;
