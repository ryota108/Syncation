import React,{useEffect} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isRestingState } from '../recoil/atom';

function StopNotification() {

  const isResting = useRecoilValue(isRestingState);
  const setResting = useSetRecoilState(isRestingState);

  useEffect(()=>{
   setResting({isResting:!isResting.isResting})
  },[])


  return (
    <div className="container">
    <div className="ripples">
      <div></div>
    </div>
  </div>
  )
}

export default StopNotification