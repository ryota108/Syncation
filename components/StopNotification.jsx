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
 <>
 </>
  )
}

export default StopNotification