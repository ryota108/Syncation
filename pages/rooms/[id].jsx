import { useState } from "react";
import Timer from "../../components/Timer";
import CountDownTimer from "../../components/CountDownTimer";
import UserAll from "../../components/UserAll";
import { userState, hostState,isRestingState } from "../../recoil/atom";
import {useRecoilValue, useSetRecoilState} from "recoil"
import Link from "next/link"


const Home  = () => {
  
  const [targetTime, setTargetTime] = useState()

  const user = useRecoilValue(userState)
  const host  = useRecoilValue(hostState)

  // start処理がtrueにする条件
  
  const submitHandler  = (time) =>{
    if( host && user.length >= 1){
      setTargetTime(time)
     }
  }

  console.log(host);

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
