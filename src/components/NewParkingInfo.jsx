import React, {Component} from 'react';
import { Select, TimePicker, Slider, Icon, Button} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import uuid from 'uuid/v4';
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
      for(let i = 0; i < arrLen; i++){
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
      this.props.onChange('hours',infoArr);
      this.props.onSubmit();
      this.props.polyline.setEditable(false);
      this.props.polyline.setDraggable(false);
      this.props.onCondChange('isSubmitInfoOpen',false);
    }

    const inputValue = (key) => (
      this.props.dynline[key] ? this.props.dynline[key] : ''
    )
    const dolllarDiv = [];
    const rate = this.props.dynline.rate ? this.props.dynline.rate : 0
    for(let i = 0; i < rate;i++){
      dolllarDiv.push(<Icon type="dollar" style={{color:'#EEBA4C', fontSize:40}}/>)
    }

    const formSelectDiv = (idx) => {
      let date = this.state.forms['info'+idx].date;
      let startTime = this.state.forms['info'+idx].startT;
      let endTime = this.state.forms['info'+idx].endT;

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
            use12Hours
            format="h:mm a"
            minuteStep={10}
            defaultOpenValue={ moment('08:00', 'h:mm a')}
            value={ startTime ? moment(startTime, 'h:mm a') : null}
            onChange={this.onTimeSelect(idx,'startT')}
          />
            ~
          <TimePicker
            className='end-time'
            placeholder='to'
            style={{ width: 100}}
            use12Hours
            format="h:mm a"
            minuteStep={10}
            defaultOpenValue={moment('3:00', 'h:mm p')}
            value={ endTime ? moment(endTime,"h:mm a") : null}
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
      <div className={this.props.classname}>
        <strong>Nearby Address:</strong>
        <p>{this.props.polyline.address}</p><br/>
        <strong>Hours: </strong>
            {formSelectArr.map(form=>(form))}
            <Button key={uuid()} icon="plus" onClick={this.addFormNum}/>
            {this.state.formNum>1? <Button icon="minus" onClick={this.removeFormNum}/> : ''}
            <br/><br/>
            <div className="slider-wrapper">
              <Slider
                marks={marks}
                max={5}
                onChange={this.onRateChange('rate')}
                value={inputValue('rate')}
              />
            {rate === 0 ? <Icon type="dollar" style={{color:'rgba(0, 0, 0, .45)', fontSize:40}}/> : dolllarDiv.map(element =>(<span key={uuid()}>{element}</span>))}
            </div>
            <br/><br/>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type='submit' onClick={onSubmit}>Submit</Button>
        <br/>
      </div>
    )
  }
}

export default NewParkingInfo;
