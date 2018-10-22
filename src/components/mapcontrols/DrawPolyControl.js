const DrawPolyControl = (controlDiv) => {

  // controlDiv.style.backgroundColor = '#fff';
  // controlDiv.style.border = '2px solid #fff';
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('plus.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginLeft = '10px';
  controlDiv.style.marginTop = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '30px';
  controlDiv.style.width = '30px';
  controlDiv.title = 'Add new parking info'
  
}

export default DrawPolyControl;