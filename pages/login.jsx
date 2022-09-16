import React , {useContext, useRef} from 'react'
import classes from "../styles/login.module.css";
import Router from "next/router"
import {BsDoorOpenFill } from "react-icons/bs";
import { useRecoilState } from "recoil"
import { roomState} from '../recoil/atom'
import { SocketContext } from '../context/SocketProvider';


function Login() {

  const userRef = useRef(null)
  const roomRef = useRef(null)
  const [roomInfo, setRoomInfo] = useRecoilState(roomState)

  const socket = useContext(SocketContext)

  
 
  const submitHandle = ()=>{

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
            "username": userRef.current.value,
            "status": "player",
            "room_id": roomRef.current.value,
            "is_host": false,
            "progress": 0
        }        
      )};

    fetch('http://localhost:8000/user', requestOptions)
      .then(response => response.json())
      .then(res => { 
        console.log(res)
      })
      .catch(err => console.log(err))

    setRoomInfo({id: roomRef.current.value})
    socket.emit("join_room", {
      "roomId": roomRef.current.value,
      "username": userRef.current.value
    })
    Router.push(`/rooms/${roomRef.current.value}`)
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

export default Login