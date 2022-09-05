import React from 'react'
import Task from './Task'
import { taskState } from '../recoil/atom'
import { useRecoilValue } from 'recoil'

function TaskAll() {
  const tasks = useRecoilValue(taskState);
  return (
    <>
  {tasks.map((task)=>{
  return (<Task task={task.task} key={task.id} id={task.id}/>)
  })}
    </>
  )
}

export default TaskAll