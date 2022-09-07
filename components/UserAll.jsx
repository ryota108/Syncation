import React from "react";
import User from "./User";
import classes from "./UserAll.module.css";
import { userState, hostState, userListState } from "../recoil/atom";
import {useRecoilValue} from "recoil"

function UserAll() {

  // const REAL_DATA = useRecoilValue(userState)
  const REAL_DATA = useRecoilValue(userListState)
  const HOST_DATA = useRecoilValue(hostState) 

  console.log(REAL_DATA)



  return (
  <div className={classes.userContainer}>
    <div className={`${classes.box} ${classes.top}`}>
      <User userName = {HOST_DATA.hostName} done= "0%"/>
      
   {REAL_DATA.map((user,index)=>{
      return (<User key={index} userName={user.username} done={"30%"}/>)
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
