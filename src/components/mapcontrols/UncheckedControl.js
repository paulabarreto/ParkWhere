const UncheckedControl = (controlDiv) => {
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('unchecked.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginLeft = '20px';
  controlDiv.style.marginTop = '10px';
  controlDiv.style.height = '45px';
  controlDiv.style.width = '45px';
}

export default UncheckedControl;