import React from 'react'
import classes from "./Modal.module.css";

function Modal({children,title}) {
  return (
    <div className={classes.Modal}>
      <h1 className={classes.title}>{title}</h1>
      <div>{children}</div>
    </div>
  )
}

export default Modal