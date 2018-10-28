import React, {Component} from 'react';
import { Well, FormGroup, InputGroup, FormControl }from 'react-bootstrap';
import { Input, Select, TimePicker, Slider, Icon, Button} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const Option = Select.Option;

class NewParkingInfo  extends Component {
  state = {
    date:'',
    from:'',
    to:'',
    dateArr:[]
  }
  handleRateChange = (rate) => {
    this.setState({ rate });
  }

  onRateChange = key => value => {
    this.props.onChange(key, value);
  }

  render(){
    const marks = {
      0: 'free',
      5: {label: <strong>$5/hr</strong>},
    };

    const onCancel = () => {
      this.props.onCondChange('isSubmitInfoOpen',false);
      this.props.polyline.setEditable(false);
      this.props.polyline.setDraggable(false);
      this.props.clearPoly();
    }
    const onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit();
      this.props.polyline.setEditable(false);
      this.props.polyline.setDraggable(false);
      this.props.onCondChange('isSubmitInfoOpen',false);
    }
    const onChange = key => e => {
      this.props.onChange(key, e.target.value);
    }
    //const onClick = key => e => (this.props.onChange(key, e));

    const inputValue = (key) => (
      this.props.dynline[key] ? this.props.dynline[key] : ''
    )
    const dolllarDiv = [];
    const rate = this.props.dynline.rate ? this.props.dynline.rate : 0
    for(let i = 0; i < rate;i++){
      dolllarDiv.push(<Icon type="dollar" style={{color:'#EEBA4C', fontSize:30}}/>)
    }

    return  (
      <Well className={this.props.classname}>
        <p>Nearby Address:</p>
        <p>{this.props.polyline.address}</p><br/>
        <form onSubmit={onSubmit}>
          Enter Parking Info
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>Hours</InputGroup.Addon>
                <FormControl
                type="text"
                onChange={onChange('hours')}
                value={inputValue('hours')}
                />
            </InputGroup>
          </FormGroup>
            <Select 
            defaultValue="Select date" 
            style={{ width: 120}} 
            onChange={value=>(this.setState({date:value}))}
            >
              <Option value="Mon-Fri">Mon-Fri</Option>
              <Option value="Saturday">Saturday</Option>
              <Option value="Sunday" >Sunday</Option>
            </Select>
            <TimePicker
              className='start-time'
              placeholder='from' 
              style={{ width: 100}} 
              use12Hours 
              format="h:mm a" 
              minuteStep={10}
              defaultOpenValue={moment('00:00', 'h:mm a')}
              onChange={value=>(this.setState({from:value?value.format('h:mm a'):''}))}
            />
            {' '} ~ {' '}
            <TimePicker
              className='end-time' 
              placeholder='to'
              style={{ width: 100}} 
              use12Hours 
              format="h:mm a" 
              minuteStep={10}
              defaultOpenValue={moment('00:00', 'h:mm a')}
              onChange={value=>(this.setState({to:value?value.format('h:mm a'):''}))}
            />
            <Button icon="plus"/>            
            <br/><br/>
            <div className="slider-wrapper">
            {rate === 0 ? <Icon type="dollar" style={{color:'rgba(0, 0, 0, .45)', fontSize:30}}/> : dolllarDiv.map(element =>(<span>{element}</span>))}
              <Slider 
                marks={marks}
                max={5} 
                onChange={this.onRateChange('rate')} 
                value={inputValue('rate')} 
              />
            </div>
            <br/><br/>                 
          <Button onClick={onCancel}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </form>
        <br/>
      </Well>
    )
  }
}

export default NewParkingInfo;