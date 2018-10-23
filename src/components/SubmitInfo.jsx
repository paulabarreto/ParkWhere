import React, { Component } from 'react';
import { Modal, Button, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem }from 'react-bootstrap';

class SubmitInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:''
    };
  }

  onHide = () => {
    this.props.onHide('show')
  }
  render() {
    const onDropdownChange = key => (e) => {
      this.setState({[key]: e.target.text})
    };
    return (
      <div className="modal-container" >
        <Modal show={this.props.show} onHide={this.onHide} bsSize="small" >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Add Parking Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.props.onSubmit}>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl type="text" />
                  <InputGroup.Addon>/hr</InputGroup.Addon>
                </InputGroup>
                <InputGroup>
                  <InputGroup.Addon>Duration</InputGroup.Addon>
                  <FormControl type="text" />
                  <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.title}>
                      <MenuItem key="1" onClick={onDropdownChange('title')}>MON-FRI</MenuItem>
                      <MenuItem key="2"onClick={onDropdownChange('title')}>SAT</MenuItem>
                      <MenuItem key="3"onClick={onDropdownChange('title')}>SUN</MenuItem>
                  </DropdownButton>
                </InputGroup>                
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={this.onHide}>Cancel</Button>
          <Button type='submit'>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SubmitInfo;