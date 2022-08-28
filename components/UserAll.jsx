import React from "react";
import User from "./User";
import classes from "./UserAll.module.css";
import { userState, hostState } from "../recoil/atom";
import {useRecoilValue} from "recoil"

function UserAll() {

  const REAL_DATA = useRecoilValue(userState)
  const HOST_DATA = useRecoilValue(hostState) 


  const data = REAL_DATA.slice()

  return (
  <div className={classes.userContainer}>
    <div className={`${classes.box} ${classes.top}`}>
      <User userName = {HOST_DATA.hostName} done= "0%"/>
      
   {data.map((user,index)=>{
      return (<User key={index} userName={user.userName} done={`${user.progress}%`}/>)
    })}
    </div>
    {/* <div className={`${classes.box} ${classes.bottom}`}>
   {data2.map((user,index)=>{
      return (<User key={index} userName={user.user} done={user.done}/>)
    })}
    </div> */}
  </div>
  
  )
}

export default UserAll;
