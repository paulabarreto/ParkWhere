import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import parkwhere from '../parkwhere.jpg';

class HomePage extends Component {
  render() {
    return (
      <Jumbotron className="jumboImg">
        <img src={parkwhere} alt="" className="img"/>
      </Jumbotron>
    );
  }
}

export default HomePage;
