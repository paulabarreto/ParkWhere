import React, { Component } from 'react';
import NavBar from './components/Nav.jsx'
import Map from './components/Map.jsx'
import axios from 'axios';
class App extends Component {

  componentDidMount() {
    axios.get("https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots'")
      .then(res => {
        console.log(res)
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
