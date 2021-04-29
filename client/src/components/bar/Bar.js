import React from "react";
import './Bar.css'
const Bar = (props) => {
  let {  completed } = props;
  let temp=0;
if(completed>200){
  temp = completed;
  completed = 200;
}

  const fillerStyles = {
    height: '100%',
    width: `${completed+10}%`,
    backgroundColor: "black",
    borderRadius: 'inherit',
    textAlign: 'left'
  }



  return (
    <div className="containerStyles">
      <div style={fillerStyles}>
        <label className="labelStyles">{`${temp !==0 ? temp : completed}`}</label>
      </div>
    </div>
  );
};

export default Bar;