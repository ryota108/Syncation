import { useContext, useState } from "react";
import Timer from "../../components/Timer";
import CountDownTimer from "../../components/CountDownTimer";
import UserAll from "../../components/UserAll";
import { userState, hostState,isRestingState, userListState } from "../../recoil/atom";
import {useRecoilValue, useSetRecoilState} from "recoil"
import Link from "next/link"
import { SocketContext } from "../../context/SocketProvider";7
// import {socket} from '../launchRoom'


const Home  = () => {
  
  const [targetTime, setTargetTime] = useState()

  const users = useRecoilValue(userListState)
  const setUsers = useSetRecoilState(userListState)
  const host  = useRecoilValue(hostState)
  const socket = useContext(SocketContext)
  console.log(users)
  // start処理がtrueにする条件
  
  const submitHandler  = (time) =>{
    if( host && users.length >= 1){
      setTargetTime(time)
     }
  }

  /* ルームに入室してきたユーザの情報を取得する */

  // socket.emit("entered_room", {"username": host.hostName})
  socket.on("joined_room", (data) => {
    console.log(data)
    setUsers([
      ...users,
      {
        "username": data.username,
      }
    ])
  })
  // socket.on("joined_room", (data) => {
  //   console.log("ID: " + data.id + "ユーザ名: " + data.username)
  // })

  return (
    <>
<CountDownTimer targetDate={targetTime}/>
  <Timer onHelp ={submitHandler}  />
  <UserAll/>
  <Link href="/login">login</Link>
  <Link href="/launchRoom">host</Link>
    </>
  )
}

export default Home
