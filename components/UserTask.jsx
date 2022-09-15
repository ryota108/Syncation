import React from 'react';
import styles from "../styles/UserTask.module.css";

function UserTask({name,id,done,checkable}) {
  return (
    <>
    <div className={styles.taskContainer}>
      <p className={styles.taskTitle}>{name}</p>
      <input type="checkbox"/>
      <p>{done}</p>
    </div>
    </>
  )
}

export default UserTask