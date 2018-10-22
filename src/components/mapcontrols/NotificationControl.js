const NotificationControl = (controlDiv) => {
  controlDiv.style.backgroundColor = '#fff';
  controlDiv.style.border = '2px solid #fff';
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.marginTop = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.textContent = 'Drop two markers on the map to create new parking info';
  controlDiv.style.fontSize = '2em';
}

export default NotificationControl;