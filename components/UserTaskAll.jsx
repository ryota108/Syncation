import React,{useRef} from 'react'
import UserTask from './UserTask';
import { AiOutlinePlus } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";

function UserTaskAll({checkable}) {

  const DUMMY_TASK = [
    {name:"タスクのUIを作る",done:false,id:1},
    {name:"投票のUIを作る",done:true ,id:2},
    {name:"プレゼンの原稿を作る",done:false ,id:3},
    {name:"パワポスライドを作る",done:false,id:4},
] 
const taskRef = useRef()
const taskLength = DUMMY_TASK.length
const doneLength = DUMMY_TASK.filter((task)=>{
  return task.done === true
})

  return (
    <div>
        <div className="task_input">
              <label className="task_label">
                <FaTasks size="25px" /> Task{" "}
                <input type="text" ref={taskRef} placeholder="task" />
              </label>
              <button className="taskAddIcon">
                <AiOutlinePlus
                  className="taskAdd_icon"
                  size="25px"
                />
              </button>
            </div>
   {DUMMY_TASK.map((task)=> {return (<UserTask name={task.name} id={task.id} key={task.id} done={task.done} checkable={checkable}/>)})}
  <h1 className='progressNotice'>{`${doneLength.length}/${taskLength}` }</h1>
    </div>
  )
}

export default UserTaskAll;