import React from 'react';
import styles from "../styles/Comment.module.css";

function Comment({name,message,time}) {
  return (
    <>
    <div className={styles.commentContainer}>
    <div className={styles.icon}>
      <p>
     {name}
      </p>
      </div>
    <div className={styles.messageBody}>
      <p className={styles.publishDate}>{time}</p>
      <p className={styles.message}>{message}</p>
      </div>
     </div>
    </>
  )
}

export default Comment