import { useState } from "react";
import Timer from "../../components/Timer";
import CountDownTimer from "../../components/CountDownTimer";
import UserAll from "../../components/UserAll";
import { userState, hostState,isVotingState,isRestingState } from "../../recoil/atom";
import {useRecoilValue,useSetRecoilState} from "recoil"
import Link from "next/link"
import Shuffle from "../../components/Shuffle";
import { MdHowToVote } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import Image from "next/image"
import RoomStatus from "../../components/RoomStatus";
import Notification from "../../components/Notification";


const Home  = () => {
  const [restTime,setRestTime] = useState(0);
  const [targetTime, setTargetTime] = useState()
  const [needRest,setNeedRest] = useState(false);

  const user = useRecoilValue(userState)
  const host  = useRecoilValue(hostState)
  const isResting = useRecoilValue(isRestingState);
  const Voting = useRecoilValue(isVotingState);
  const setVoting = useSetRecoilState(isVotingState);


  // start処理がtrueにする条件

  const needRestHandler = () =>{
    setNeedRest(true)
  }

  const needNotRestHandler = () =>{
    setRestTime(0);
    setNeedRest(false)
  }
  
  const submitHandler  = (time) =>{
    if( host && user.length >= 1){
      setTargetTime(time)
     }
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
{(isResting.isResting && Voting.isVoting) && <div className="voteModal">
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
    <button className="voteTimeBtn" onClick={()=> setVoting({isVoting :false, min:restTime})}> 
    <h1>Vote!</h1>
    <FaVoteYea  className="voteTime_icon" size="50px"/></button>
</div>}
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
  <UserAll/>
  <Link href="/login">login</Link>
  <Link href="/launchRoom">host</Link>
    </>
  )
}

export default Home
