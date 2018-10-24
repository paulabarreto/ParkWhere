import React, {Component} from 'react';
import { Well, Button, FormGroup, InputGroup, FormControl }from 'react-bootstrap';

class SubmitParkingInfo  extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const onInfoHide = () => {
      this.props.onInfoHide('isSubmitInfoOpen')
    }
    const onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit();
      this.props.onInfoHide('isSubmitInfoOpen');
    }
    // const onChange = key => (e) => {
    //   let newVal = e.target.value;
    //   this.setState(prevState => ({...prevState, [key]: newVal}));
    // };
    const onChange = key => e => {
      this.props.onChange(key, e.target.value)
    }
    return  (
      <Well className={this.props.classname}> 
        <form onSubmit={onSubmit}>
        Add Parkin Info
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>Hours</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('hours')}
                value={this.props.getInfo.hours}
                />
            </InputGroup>

            <InputGroup>
              <InputGroup.Addon>Rate</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('rate')}
                value={this.props.getInfo.rate}
                />
            </InputGroup>     
          </FormGroup>
          <Button onClick={onInfoHide}>Cancel</Button>
         <Button type='submit'>Submit</Button>
        </form>
      </Well>
    )
  }
}

export default SubmitParkingInfo;