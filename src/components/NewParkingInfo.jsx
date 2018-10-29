import React, {Component} from 'react';
import { Well, FormGroup, InputGroup, FormControl }from 'react-bootstrap';
import { Select, TimePicker, Slider, Icon, Button} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const Option = Select.Option;

class NewParkingInfo  extends Component {
  state = {
    forms:{info1:{date:'', from:'', to:''}},
    formNum:1
  }

  addFormNum = () => {
    let num = this.state.formNum + 1;
    let info = {...this.state.forms}
    info['info'+num] =  {date:'', from:'', to:''};
    this.setState(prevstate=>({...prevstate, forms:info, formNum:num}));
  }

  removeFormNum = () => {
    delete this.state.forms['info'+this.state.formNum];
    let num = this.state.formNum - 1;
    this.setState(prevstate=>({...prevstate, formNum:num}));
  }

  onRateChange = key => value => {
    this.props.onChange(key, value);
  }

  onDateSelect = index => value => {
    let forms = {...this.state.forms};
    forms['info'+index]['date'] = value;
    this.setState(prevstate=>({...prevstate, forms:forms}));
  }

  onTimeSelect = (index,key) => value => {
    let info = {...this.state.forms};
    info['info'+index][key] = value? value.format('h:mm a') : '';
    this.setState(prevstate=>({...prevstate, forms:info}));
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
      //this.props.onSubmit();
      this.props.polyline.setEditable(false);
      this.props.polyline.setDraggable(false);
      this.props.onCondChange('isSubmitInfoOpen',false);

      let datearr = []
      for(let key in this.state.forms){
        datearr.push(`${this.state.forms[key].date} ${this.state.forms[key].from} to ${this.state.forms[key].to}`)
        console.log(datearr)
      }
    }
    const onChange = key => e => {
      this.props.onChange(key, e.target.value);
    }

    const inputValue = (key) => (
      this.props.dynline[key] ? this.props.dynline[key] : ''
    )
    const dolllarDiv = [];
    const rate = this.props.dynline.rate ? this.props.dynline.rate : 0
    for(let i = 0; i < rate;i++){
      dolllarDiv.push(<Icon type="dollar" style={{color:'#EEBA4C', fontSize:30}}/>)
    }

    const formSelectDiv = (idx) => (
      <div>
        <Select
        defaultValue="Select date"
        style={{ width: 120}}
        onChange={this.onDateSelect(idx)}
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
          defaultOpenValue={moment('08:00', 'h:mm a')}
          onChange={this.onTimeSelect(idx,'from')}
        />
        {' '} ~ {' '}
        <TimePicker
          className='end-time'
          placeholder='to'
          style={{ width: 100}}
          use12Hours
          format="h:mm a"
          minuteStep={10}
          defaultOpenValue={moment('00:00', 'h:mm p')}
          onChange={this.onTimeSelect(idx,'to')}
        />
      </div>
    )

    const formSelectArr = [];
    for(let i = 0; i < this.state.formNum; i++){
      formSelectArr.push(formSelectDiv(i+1));
    }
    return  (
      <Well className={this.props.classname}>
        <p>Nearby Address:</p>
        <p>{this.props.polyline? this.props.polyline.address:''}</p><br/>
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
            {formSelectArr.map(form=>(form))}
            <Button icon="plus" onClick={this.addFormNum}/>
            {this.state.formNum>1? <Button icon="minus" onClick={this.removeFormNum}/> : ''}
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
          <Button type='submit' onClick={onSubmit}>Submit</Button>
        </form>
        <br/>
      </Well>
    )
  }
}

export default NewParkingInfo;
