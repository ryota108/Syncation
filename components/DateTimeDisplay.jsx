import React from 'react';
import classes from "./DateTimeDisplay.module.css";

const DateTimeDisplay = ({ value , type , isDanger }) => {
  if (value === -1 || !value){
    value = 0
  } else if (0  < value && value < 10){
    value = "0" + value
  }
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p className={classes.number}>{value}</p>
      <span className={classes.type}>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;