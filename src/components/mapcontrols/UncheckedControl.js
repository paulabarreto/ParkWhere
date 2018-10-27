const UncheckedControl = (controlDiv) => {
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('cancel.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginLeft = '20px';
  controlDiv.style.marginTop = '10px';
  controlDiv.style.height = '40px';
  controlDiv.style.width = '40px';
}

export default UncheckedControl;