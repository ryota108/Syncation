import React , {useContext, useRef} from 'react'
import classes from "../styles/login.module.css";
import Router from "next/router"
import {BsDoorOpenFill,BsDoorOpen} from "react-icons/bs";
import {useRecoilValue,useSetRecoilState} from "recoil"
import {userListState, userState} from '../recoil/atom'
import { SocketContext } from '../context/SocketProvider';


function login() {

  const test = useRecoilValue(userState);

  const setTest = useSetRecoilState(userState);

  const userRef = useRef(null)
  const roomRef = useRef(null)

  const users = useRecoilValue(userListState)
  const setUsers = useSetRecoilState(userListState)

  const socket = useContext(SocketContext)
  console.log(users)

 
  const submitHandle = ()=>{
    // context でグローバル化にする
    // socket.on("recieve_left_time", (data) => {

    // })
    setTest([...test ,{id:1,userName:userRef.current.value,progress:0}])
    setUsers([
      ...users,
      {
        "username": userRef.current.value,
        "roomId": "test"
      }
    ])
    socket.emit("join_room", {
      "roomId": "test",
      "username": userRef.current.value
    })
    Router.push(`/rooms/test`)
  }
  const formHandle = (e) =>{
  e.preventDefault()
}

  return (
    <div className='Modal'>    
      <h1 className={classes.joinTheRoomTitle}>Join the Room <BsDoorOpenFill color='white'/> </h1>
      <form onSubmit={formHandle} className={classes.loginModal}>
     <label className={classes.loginInput}>Room ID <input ref={roomRef}/></label>
     <label className={classes.loginInput}>User Name <input ref={userRef}/></label>
     <div className="btn blue loginBtn" onClick={submitHandle}>
            <p>Submit</p>
          </div>
     </form>
    </div>
  )
}

export default login