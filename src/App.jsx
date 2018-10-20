import React, { Component } from 'react';
import NavBar from './components/Nav.jsx'
import Map from './components/Map.jsx'
import axios from 'axios';
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
      <div>
        <NavBar />
        <Map coords={this.state.coords} />
      </div>

    );
  }
}

export default App;
