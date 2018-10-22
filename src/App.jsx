import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx';


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
        </Switch>
     </Router>

    );
  }
}

export default App;
