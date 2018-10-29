import React, { Component } from "react";
import { Jumbotron, Button, InputGroup } from "react-bootstrap";
import { Input, FormInline, Container, Row, Col, Fa  } from "mdbreact";
import parkwhere_description from '../parkwhere_explained.jpg';
import parkwhere from '../parkwhere_edited.jpg';

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
          <img src={parkwhere} alt="" className="img"/>
            <Input
            placeholder="Search addres"
            type="text"
            containerClass="active-cyan active-cyan-2 mt-0 mb-3"
            className="searchBar"
            value={this.state.search}
            onChange={this.onSearchChange}
            onKeyPress={this.onKeyPress}
            />
          <Button className="btn-search" bsStyle="info">Search</Button>
        </Jumbotron>
        <div className="container">
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
