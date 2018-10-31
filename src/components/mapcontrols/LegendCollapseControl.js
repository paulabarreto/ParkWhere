const LegendCollapseControl = (controlDiv) => {

  // controlDiv.style.backgroundColor = '#fff';
  // controlDiv.style.border = '2px solid #fff';
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('close.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '33px';
  controlDiv.style.marginTop = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '35px';
  controlDiv.style.width = '35px';
}

export default LegendCollapseControl;