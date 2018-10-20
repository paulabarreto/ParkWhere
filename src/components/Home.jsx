import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';



class Home extends Component {
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
    return (
      <div>
        <Nav />
        < Map coords={this.state.coords}/>
      </div>

    );
  }
}

export default Home;
