const Rate2Control = (controlDiv) => {

  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundColor = '#8EDC9D';
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '20px';
  controlDiv.style.marginTop = '5px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '40px';
  controlDiv.style.width = '50px';
  
  let controlText = document.createElement('div');
  controlText.innerHTML = '$2/hr';
  controlText.style.color = 'white';
  controlText.style.marginTop = '25%';
  controlText.style.fontSize = '1.3em';
  controlText.style.fontWeight = 'bold';
  controlText.style.textAlign = 'center';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlDiv.appendChild(controlText);
}
export default Rate2Control;