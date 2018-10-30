import React, { Component } from 'react';
import { Input, Button, Icon, DatePicker} from 'antd';
import { Image } from 'react-bootstrap';
import greenP from '../greenP_logo.png';
import rover from '../rover_logo.jpg';
import indigo from '../indigo_logo.png';
import 'antd/dist/antd.css';
import PlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-places-autocomplete';

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
    geocodeByAddress(this.state.searchValue)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  }

  emitEmpty = () => {
    this.searchInput.focus();
    this.setState({ searchValue: '' });
  }
  
  render() {
    const autoCompleteDiv = (      
    <PlacesAutocomplete
      value={this.state.searchValue}
      onChange={this.handleChange}
      onSelect={this.onSearchClick}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>)
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
          {this.props.mapDidMount ? autoCompleteDiv: ''}
          <br/><br/>
          <DatePicker
            showTime
            format="YYYY-MM-DD h:mm:ss a"
            placeholder="Select date and time"
            onChange={this.onDateChange}
          />
          <Button onClick={this.onSearchClick}>Search</Button>
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
