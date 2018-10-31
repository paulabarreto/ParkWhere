const Rate3Control = (controlDiv) => {

  controlDiv.style.borderRadius = '10px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundColor = '#336699';
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '25px';
  controlDiv.style.marginTop = '5px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '40px';
  controlDiv.style.width = '50px';

  let controlText = document.createElement('div');
  controlText.innerHTML = '$3/hr';
  controlText.style.marginTop = '25%';
  controlText.style.fontSize = '1.3em';
  controlText.style.color = 'white';
  controlText.style.fontWeight = 'bold';
  controlText.style.textAlign = 'center';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlDiv.appendChild(controlText);
  
}
export default Rate3Control;