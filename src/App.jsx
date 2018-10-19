import React, { Component } from 'react';
import NavBar from './components/Nav.jsx'
import Map from './components/Map.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Map />
      </div>

    );
  }
}

export default App;
