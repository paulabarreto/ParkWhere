import React, { Component } from "react";
import { Jumbotron, Button, InputGroup } from "react-bootstrap";
import { Input } from "mdbreact";
import parkwhere_description from '../parkwhere_explained.jpg';
import parkwhere from '../street-parking.jpg';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  onSearchChange = (e) => {
    this.setState({search: e.target.value})
  }

  onKeyPress = e => {
    if (e.key === 'Enter' ){
      this.props.handleSearchPlace(e.target.value)
      e.target.value = '';
    }
  }

  render() {
    return (
      <div>

        <Jumbotron className="jumboImg">
              <h3>Can we help you find street parking?</h3>
              <h4>Introducing ParkWhere</h4>
              <p>A community based resource to make street parking more efficient</p>
        </Jumbotron>
        <div className="container-description">
          <img src={parkwhere_description} alt="" className="description-img"/>
          <div className="description-text">
            Before parking your car, check out some information on street parking
            spots near your destination.
            <br/>
            <div className="description-text-second">
              <br/>
              And you can add yourself some useful information for other drivers!
            </div>

          </div>
        </div>
      </div>

    );
  }
}

export default HomePage;
