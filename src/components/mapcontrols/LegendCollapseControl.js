const LegendCollapseControl = (controlDiv) => {

  // controlDiv.style.backgroundColor = '#fff';
  // controlDiv.style.border = '2px solid #fff';
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('arrow-up.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '20px';
  controlDiv.style.marginTop = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '50px';
  controlDiv.style.width = '50px';
  
}

export default LegendCollapseControl;