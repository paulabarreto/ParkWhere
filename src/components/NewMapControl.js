const NewControl = (controlDiv) => {

  // let controlUI = document.createElement('div');
  controlDiv.style.backgroundColor = '#fff';
  controlDiv.style.border = '2px solid #fff';
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('current-location.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '40px';
  controlDiv.style.width = '40px';
  controlDiv.title = 'MyLocation';
  // controlDiv.appendChild(controlUI);

  // let controlText = document.createElement('div');
  // controlText.style.color = 'rgb(25,25,25)';
  // controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  // controlText.style.fontSize = '16px';
  // controlText.style.lineHeight = '38px';
  // controlText.innerHTML = 'MyLocation';
  // controlUI.appendChild(controlText);
}

export default NewControl;