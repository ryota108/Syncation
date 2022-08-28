import { useState } from "react";
import Timer from "../../components/Timer";
import CountDownTimer from "../../components/CountDownTimer";
import UserAll from "../../components/UserAll";
import { userState, hostState } from "../../recoil/atom";
import {useRecoilValue} from "recoil"
import Link from "next/link"


const Home  = () => {
  
  const [targetTime, setTargetTime] = useState()
  const [start, setStart] = useState(false);

  const user = useRecoilValue(userState)
  const host  = useRecoilValue(hostState)
  // start処理がtrueにする条件

 

 console.log(user.length,host.length)
  
  const submitHandler  = (time) =>{
    if( host && user.length >= 1){
      setTargetTime(time)
     }
  }

  return (
    <>

<CountDownTimer targetDate={targetTime} />
  <Timer onHelp ={submitHandler} />
  <UserAll/>
  <Link href="/login">login</Link>
  <Link href="/launchRoom">host</Link>
    </>
  )
}

export default Home
