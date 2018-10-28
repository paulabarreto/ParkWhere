const CheckedControl = (controlDiv) => {
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('confirm.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginLeft = '20px';
  controlDiv.style.marginTop = '10px';
  controlDiv.style.height = '50px';
  controlDiv.style.width = '50px';
}

export default CheckedControl;