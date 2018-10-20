import React, { Component } from 'react';
import NavBar from './components/Nav.jsx'
import Map from './components/Map.jsx'
import axios from 'axios';
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
      <div>
        <NavBar />
        <Map />
      </div>

    );
  }
}

export default App;
