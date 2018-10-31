import React, { Component } from 'react';
import { Input, Button, Icon, DatePicker} from 'antd';
import { Image } from 'react-bootstrap';
import greenP from '../greenP_logo.png';
import rover from '../rover_logo.jpg';
import indigo from '../indigo_logo.png';
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
        <div className='search' >
          <h3 className="description-text">Find or add street parking info</h3>
          <Input
            placeholder="Search address"
            style={{ width: 200 }}
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
            style={{ width: 200 }}
            onChange={this.onDateChange}
          />
          <br/><br/>
          <Button 
            onClick={this.onSearchClick} 
            style={{ width: 200 }}
            type="primary" ghost
            >Search</Button>
        </div>
        <br/><br/><br/><br/>
        <div>
          <h4 className="description-text">Or explore off-street parking info</h4>
            <a href="http://parking.greenp.com">
            <Image circle src={greenP} className="logos" href="https://parking.greenp.com/"/>
            </a>
            <a href="http://roverparking.com/">
            <Image circle src={rover} className="logos"/>
            </a>
            <a href="https://ca.parkindigo.com/en">
            <Image circle src={indigo} className="logos" />
            </a>
        </div>
      </div>
    );
  }
}

export default Search;
