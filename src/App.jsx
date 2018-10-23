import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      show: false
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
          <Route path='/register' render={(props) => <Register {...props} login={this.handleLogin} />} />
      </Switch>
     </Router>

    );
  }
}

export default App;
