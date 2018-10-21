const NewControl = (controlDiv) => {

  // controlDiv.style.backgroundColor = '#fff';
  // controlDiv.style.border = '2px solid #fff';
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('gps-fixed-indicator.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '40px';
  controlDiv.style.width = '40px';
  
}

export default NewControl;