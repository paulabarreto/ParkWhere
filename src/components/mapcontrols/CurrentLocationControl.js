const CurrentLocationControl = (controlDiv) => {

  // controlDiv.style.backgroundColor = '#fff';
  // controlDiv.style.border = '2px solid #fff';
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('centre-location.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '10px';
  controlDiv.style.marginBottom = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '30px';
  controlDiv.style.width = '30px';
}

export default CurrentLocationControl;