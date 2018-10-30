const RefreshControl = (controlDiv) => {
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('refresh.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginLeft = '20px';
  controlDiv.style.marginBottom = '0px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '50px';
  controlDiv.style.width = '50px';
}

export default RefreshControl;