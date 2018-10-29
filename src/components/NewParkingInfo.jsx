import React, {Component} from 'react';
import { Well }from 'react-bootstrap';
import { Select, TimePicker, Slider, Icon, Button} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const Option = Select.Option;

class NewParkingInfo  extends Component {
  
  constructor(props){
    super(props)

    let arrLen = this.props.dynline.hours.length;
    this.state = {
      forms:{info1:{date:'',startT:'',endT:''}},
      formNum: arrLen !==0 ? arrLen : 1
    }

    if (arrLen !== 0){
      let {forms} = this.state;
      for(let i = 0; i <  arrLen; i++){
          forms['info'+ (i + 1)] = {...this.props.dynline.hours[i]};
      }
      this.setState(prevstate=>({...prevstate, forms:forms}));
    }
  }
  
  addFormNum = () => {
    let num = this.state.formNum + 1;
    let forms = {...this.state.forms}
    forms['info'+num] =  {date:'', startT:'', endT:''};
    this.setState(prevstate=>({...prevstate, forms:forms, formNum:num}));
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
    let forms = {...this.state.forms};
    forms['info'+index][key] = value? value.format('h:mm a') : '';
    this.setState(prevstate=>({...prevstate, forms:forms}));
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
      let infoArr = []
      for(let key in this.state.forms){
        infoArr.push(this.state.forms[key])
      }

      this.props.onSubmit(infoArr);
      this.props.polyline.setEditable(false);
      this.props.polyline.setDraggable(false);
      this.props.onCondChange('isSubmitInfoOpen',false);
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

    const formSelectDiv = (idx) => {
      let date = this.state.forms['info'+idx].date;
      let startTime = this.state.forms['info'+idx].startT;
      let startTimeNum = startTime.split(' ')[0];
      let startTimeAPM = startTime.split(' ')[1]
      let endTime = this.state.forms['info'+idx].endT;
      let endTimeNum = endTime.split(' ')[0];
      let endTimeAPM = endTime.split(' ')[1]
      return(
        <div>
          <Select 
          defaultValue= {date ? date : "Select date" }
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
            format="HH:mm " 
            minuteStep={10}
            defaultOpenValue={ moment('08:00', 'HH:mm')}
            value={ startTime ? moment(startTime, 'HH:mm') : null}
            onChange={this.onTimeSelect(idx,'startT')}
          />
            ~
          <TimePicker
            className='end-time' 
            placeholder='to'
            style={{ width: 100}} 
            format="HH:mm" 
            minuteStep={10}
            defaultOpenValue={moment('3:00')}
            value={ endTime ? moment(endTime,"HH:mm") : null}
            onChange={this.onTimeSelect(idx,'endT')}
          />        
        </div>
      )
    }
    
    const formSelectArr = [];
    for(let i = 0; i < this.state.formNum; i++){
      formSelectArr.push(formSelectDiv(i+1));
    }
    return  (
      <Well className={this.props.classname}>
        <p>Nearby Address:</p>
        <p>{this.props.polyline.address}</p><br/>
          Enter Parking Info
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
        <br/>
      </Well>
    )
  }
}

export default NewParkingInfo;
