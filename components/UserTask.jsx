import React,{useState} from 'react';
import styles from "../styles/UserTask.module.css";

function UserTask({name,id,done,checkable}) {

 const [taskDone,setTaskDone] = useState(false)
   
  const taskDoneHandler = () =>{
    setTaskDone(prev => !prev )
  }

  return (
    <>
    <div className={styles.taskContainer}>
      <p className={taskDone ? styles.taskTitleDone : styles.taskTitle}>{name}</p>
      <input type="checkbox" className={styles.checkBox} onClick={taskDoneHandler}/>
      <p>{done}</p>
    </div>
    </>
  )
}

export default UserTask