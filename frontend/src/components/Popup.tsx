import React from 'react';
import ReactDOM from 'react-dom';
const NotificationCenter: React.FC =  () => {

  return (
  <>
    <button 
  className="delete button"
  onClick={() => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Crumb?"
    )
    if (confirmBox === true) {
      console.log('ala ma kota')
    }
  }}>sadsd
</button>
</>
  );
}

export default NotificationCenter;