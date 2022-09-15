import { useContext, useState ,useEffect } from "react";
import Timer from "../../components/Timer";
import CountDownTimer from "../../components/CountDownTimer";
import UserAll from "../../components/UserAll";
import {IoChatbubblesOutline} from "react-icons/io5"
import { userState, hostState,isRestingState,isVotingState, userListState, roomState } from "../../recoil/atom";
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"
import Link from "next/link"
import Chat from "../../components/Chat"
import Modal from "../../UI/Modal"
import { SocketContext } from "../../context/SocketProvider";7
// import {socket} from '../launchRoom'
import Shuffle from "../../components/Shuffle";
import { MdHowToVote } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import {GrAnnounce} from "react-icons/gr"
import {BiTask} from "react-icons/bi";
import Image from "next/image"
import RoomStatus from "../../components/RoomStatus";
import Notification from "../../components/Notification";
import UserTaskAll from "../../components/UserTaskAll";


const Home  = () => {
  
  const [restTime,setRestTime] = useState(0);
  const [targetTime, setTargetTime] = useState()
  const [needRest,setNeedRest] = useState(false);
  const [chatOpen,setChatOpen] = useState(false);
  const [taskOpen,setTaskOpen] = useState(false);
  const [roomInfo,setRoomInfo] = useRecoilState(roomState);
  const [voteDone,setVoteDone] = useRecoilState(isVotingState);


  const user = useRecoilValue(userState)
  const users = useRecoilValue(userListState)
  const setUsers = useSetRecoilState(userListState)
  const host  = useRecoilValue(hostState)
  const isResting = useRecoilValue(isRestingState);
  const socket = useContext(SocketContext)

  // start処理がtrueにする条件

  const needRestHandler = () =>{
    setNeedRest(true)
  }

  const needNotRestHandler = () =>{
    setRestTime(0);
    setNeedRest(false)
  }
  
  const submitHandler  = (time) =>{
    if( host && users.length >= 1){
      setTargetTime(time)
     }
  }
  /* ルームの情報を取得する */
  useEffect(() => {
    console.log(roomInfo.id)
    fetch(`http://localhost:8000/room/${roomInfo.id}`)
    .then((res) => res.json())
    .then(res => { 
      console.log(res)
      setRoomInfo({...roomInfo, ...res})
      // ミリ時間の更新
      if (res.milisecond !== "00") {
        setTargetTime(Number(res.milisecond))
      }
      return fetch(`http://localhost:8000/room/${roomInfo.id}/users`)
    })
    .then(res => res.json())
    .then(res => { 
      console.log(res)
      const newUsers = res.users.map(user => {
        
        return {
        username: user.User.username, 
        status: user.User.status,
        is_host: user.User.is_host,
        room_id: user.User.room_id
        }
      })
      console.log(newUsers)
      setUsers([...newUsers])
    })
    .catch(err => console.log(err))
  }, [])

  console.log(roomInfo)
 /* 途中から参加してきたユーザの情報を取得する */
  useEffect(() => {
    socket.on("joined_room", (data) => {
      console.log(data)
      console.log(users)
      fetch(`http://localhost:8000/room/${roomInfo.id}/users`)
      .then(res => res.json())
      .then(res => {
        const newUsers = res.users.map(user => {
        
          return {
          username: user.User.username, 
          status: user.User.status,
          is_host: user.User.is_host,
          room_id: user.User.room_id
          }
        })
        console.log(newUsers)
        setUsers([...newUsers])
      })
      .catch(err => console.log(err))
    })
  
    // スタート時にすでにルームに存在するユーザにミリ時間の取得と更新を行う
    socket.on("receive_time", (data) => {
      console.log("時間: " + data.time + "ミリ秒")
      setTargetTime(Number(data.time))
    })
  }, [])

  console.log(voteDone.isVoting)
  if(voteDone.isVoting){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "time": restTime,
          "room_id": roomInfo.id,
          "rest_flag": false,
          "turn": roomInfo.turn
        }
      )};
    
    fetch(`http://localhost:8000/room/${roomInfo.id}/vote/${roomInfo.turn}`, requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res)
      setVoteDone({...voteDone, isVoting: false})
    })
  }
  
  const oneMinHandler = () =>{
    setRestTime(1)
  }
  const threeMinHandler = () =>{
    setRestTime(3)
  }
  const fiveMinHandler = () =>{
    setRestTime(5)
  }
  const tenMinHandler = () =>{
    setRestTime(10)
  }

  const isOne = restTime === 1;
  const isThree = restTime === 3;
  const isFive = restTime === 5;
  const isTen = restTime === 10;

  let count;
  if(host.hostName){
    count = user.length + 1
  } else {
    count = user.length
  }

 let voteStatus;
 if(host.isVoting === false){
   voteStatus = "off"
 } else {
   voteStatus = "on"
 }

  return (
    <>
    {/* isResting.isResting */}
    {console.log(isResting.isResting, voteDone.isVoting)}
{(isResting.isResting && !voteDone.isVoting) && <div className="voteModal">
 <h1 className="voteTitle"><MdHowToVote />Vote time</h1> 
 <div className="rest_choice">
  <div className={!needRest ? "needRest": "needRest_off"} onClick={needNotRestHandler}>
 <Image src="/study.png" width="200px" height="200px"/>
 <h1 className="rest_no">No</h1>
  </div>
 <div className={needRest ? "needRest": "needRest_off"} onClick={needRestHandler}>
 <Image src="/rest.png" width="200px" height="200px"/>
 <h1 className="rest_yes">Yes</h1>
 </div>
 </div>
 <div className={needRest ? "function_container" : "function_container_off"}>
    <button className={isOne ? "vote_box vote_on": "vote_box"}  onClick={oneMinHandler} disabled={!needRest}>
    <p className={isOne ? "vote_explain vote_explain_on": "vote_explain"}>1min</p>
    </button>
    <button  className={isThree ? "vote_box vote_on": "vote_box"} onClick={threeMinHandler} disabled={!needRest}>
    <p className={isThree ? "vote_explain vote_explain_on": "vote_explain"}>3min</p>
    </button>
    <button className={isFive ? "vote_box vote_on": "vote_box"} onClick={fiveMinHandler} disabled={!needRest}>
    <p className={isFive ? "vote_explain vote_explain_on": "vote_explain"}>5min</p>
    </button>
    <button  className={isTen ? "vote_box vote_on": "vote_box"}  onClick={tenMinHandler} disabled={!needRest}>     
    <p className={isTen ? "vote_explain vote_explain_on": "vote_explain"}>10min</p>
    </button>
    </div>
</div>
}
{false && <Modal color="deeppink" title="Vote Result">
  <div style={{display:"flex", justifyContent:"space-evenly"}}>
<div className={false ? "needRest": "needRest_off"} >
 <Image src="/study.png" width="200px" height="200px"/>
 <h1 className="rest_no">No</h1>
  </div>
 <div className={true ? "needRest": "needRest_off"} >
 <Image src="/rest.png" width="200px" height="200px"/>
 <h1 className="rest_yes">Yes</h1>
 </div>
  </div>
  <p className="resultMin_title">Result min</p>
  <Shuffle style= {{marginLeft:"10%"}}/>
  </Modal>}
<Notification/>
{/* <h1 className={!isResting.isResting ? "demo right": "demo right light_off"}>
  <span>W</span>
  <span>o</span>
  <span>r</span>
  <span>k</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
</h1>
<h1 className={isResting.isResting ? "demo left": "demo left light_off"}>
  <span>R</span>
  <span>e</span>
  <span>s</span>
  <span>t</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
</h1> */}
<CountDownTimer targetDate={targetTime}/>
  <Timer onHelp ={submitHandler}  />
<RoomStatus userCount={count} timer={host.time} votingStatus={voteStatus} restTime={host.isResting}/>
<div className="chatBtn" onClick={()=>{setChatOpen(!chatOpen)}}>
<IoChatbubblesOutline  size="50px"/>
</div>
<div className="taskBtn" onClick={()=>{setTaskOpen(!taskOpen)}}>
<BiTask  size="50px"/>
</div>
{chatOpen && <Modal><Chat/></Modal>}
{taskOpen && <Modal color="lightGreen" title="Task"><UserTaskAll/></Modal>}
  <UserAll/>
  <Link href="/login">login</Link>
  <Link href="/launchRoom">host</Link>
    </>
  )
}

export default Home
