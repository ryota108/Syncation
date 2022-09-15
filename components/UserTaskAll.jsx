import React from 'react'
import UserTask from './UserTask';

function UserTaskAll({checkable}) {

  const DUMMY_TASK = [
    {name:"タスクのUIを作る",done:false,id:1},
    {name:"投票のUIを作る",done:false ,id:2},
    {name:"プレゼンの原稿を作る",done:false ,id:3},
    {name:"パワポスライドを作る",done:false,id:4},
] 
  return (
    <div>
   {DUMMY_TASK.map((task)=> {return (<UserTask name={task.name} id={task.id} key={task.id} done={task.done} checkable={checkable}/>)})}
    </div>
  )
}

export default UserTaskAll;