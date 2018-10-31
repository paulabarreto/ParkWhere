import React, { Component } from 'react';
import { Input, Button, Icon, DatePicker} from 'antd';
import { Image, Carousel } from 'react-bootstrap';
import greenP from '../greenP_logo.png';
import rover from '../rover_logo.jpg';
import indigo from '../indigo_logo.png';
import impark from '../impark_logo.png';

import 'antd/dist/antd.css';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dateObject:'',
      searchValue:'',
    }
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onDateChange = (date) => {
    this.onChange('dateObject',date)
  }

  onInputChange = (input) => {
    this.onChange('searchValue', input.target.value);
  }

  handleChange = address => {
    this.setState({ searchValue:address });
  };

  onSearchClick = () => {
    this.props.handleSearch(this.state.searchValue,this.state.dateObject);
  }

  emitEmpty = () => {
    this.searchInput.focus();
    this.setState({ searchValue: '' });
  }

  render() {
    return (
      <div className="search-container">
        <h3 className="search-text">Find or add street parking info</h3>
        <div className='search' >
          <Input
            placeholder="Search address"
            style={{ width: 250 }}
            prefix={<Icon type="search" theme="outlined" className="glass"/>}
            value={this.state.searchValue}
            onChange={this.onInputChange}
            ref={node => this.searchInput = node}
          />
          <br/><br/>
          <DatePicker
            showTime
            format="YYYY-MM-DD h:mm:ss a"
            placeholder="Select date and time"
            style={{ width: 250 }}
            onChange={this.onDateChange}
          />
          <br/><br/>
          <Button
            onClick={this.onSearchClick}
            style={{ width: 250 }}
            type="primary" ghost
            >Search</Button>
        </div>
        <br/>
        <p className="search-text">Or explore off-street parking</p>
        <div className="carousel-logos">
          <Carousel>
            <Carousel.Item>
              <a href="http://parking.greenp.com">
              <Image src={greenP} className="logos" href="https://parking.greenp.com/"/>
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href="http://roverparking.com/">
              <Image src={rover} className="logos"/>
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href="https://ca.parkindigo.com/en">
              <Image src={indigo} className="logos" />
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href="https://www.impark.com/toronto-parking/">
              <Image src={impark} className="logos" />
              </a>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Search;
