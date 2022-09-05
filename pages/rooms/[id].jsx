import { useState } from "react";
import Timer from "../../components/Timer";
import CountDownTimer from "../../components/CountDownTimer";
import UserAll from "../../components/UserAll";
import { userState, hostState,isVotingState,isRestingState } from "../../recoil/atom";
import {useRecoilValue,useSetRecoilState} from "recoil"
import Link from "next/link"
import { MdHowToVote } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import Image from "next/image"


const Home  = () => {
  const [restTime,setRestTime] = useState(0);
  const [targetTime, setTargetTime] = useState()

  const user = useRecoilValue(userState)
  const host  = useRecoilValue(hostState)
  const isResting = useRecoilValue(isRestingState);
  const Voting = useRecoilValue(isVotingState);
  const setVoting = useSetRecoilState(isVotingState);


  // start処理がtrueにする条件
  
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

 console.log(Voting)

  return (
    <>
{isResting.isResting && <div className="voteModal">
 <h1 className="voteTitle"><MdHowToVote />Vote time</h1> 
 <div className="rest_choice">
  <div>
 <Image src="/study.png" width="200px" height="200px"/>
 <h1 className="rest_no">No</h1>
  </div>
 <div>
 <Image src="/rest.png" width="200px" height="200px"/>
 <h1 className="rest_yes">Yes</h1>
 </div>
 </div>
 <div className="function_container">
    <div className={isOne ? "vote_box vote_on": "vote_box"}  onClick={oneMinHandler}>
    <p className={isOne ? "vote_explain vote_explain_on": "vote_explain"}>1min</p>
    </div>
    <div  className={isThree ? "vote_box vote_on": "vote_box"} onClick={threeMinHandler}>
    <p className={isThree ? "vote_explain vote_explain_on": "vote_explain"}>3min</p>
    </div>
    <div className={isFive ? "vote_box vote_on": "vote_box"} onClick={fiveMinHandler} >
    <p className={isFive ? "vote_explain vote_explain_on": "vote_explain"}>5min</p>
    </div>
    <div  className={isTen ? "vote_box vote_on": "vote_box"}  onClick={tenMinHandler}>     
    <p className={isTen ? "vote_explain vote_explain_on": "vote_explain"}>10min</p>
    </div>
    </div>
    <button className="voteTimeBtn" onClick={()=> setVoting({isVoting :false, min:restTime})}> 
    <h1>Vote!</h1>
    <FaVoteYea  className="voteTime_icon" size="50px"/></button>
</div>}
<CountDownTimer targetDate={targetTime}/>
  <Timer onHelp ={submitHandler}  />
  <UserAll/>
  <Link href="/login">login</Link>
  <Link href="/launchRoom">host</Link>
    </>
  )
}

export default Home
