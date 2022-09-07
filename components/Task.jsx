import React from 'react'
import {MdDeleteOutline} from "react-icons/md";
import classes from "./Task.module.css"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { taskState } from '../recoil/atom';

function Task({task,id}) {

  const setTasks = useSetRecoilState(taskState);
  const tasks = useRecoilValue(taskState)

  const deleteHandler = (id) =>{
    const deletedTasks = tasks.filter(task => {
      return task.id !== id
    })
    setTasks(deletedTasks)
  }

  return (
    <>
    <div className={classes.task}>
      <p className={classes.taskName}>{task}</p>
      <button onClick={deleteHandler.bind(null,id)} className={classes.deleteBtn} ><MdDeleteOutline size="25px"className={classes.deleteIcon}/></button>
    </div>
    </>
  )
}

export default Task