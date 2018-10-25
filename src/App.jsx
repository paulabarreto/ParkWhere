import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home.jsx';
// import Login from './components/Login.jsx';
// import Register from './components/Register.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
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
