import React from "react";
import User from "./User";
import classes from "./UserAll.module.css";
import { userState, hostState, userListState } from "../recoil/atom";
import {useRecoilValue} from "recoil"

function UserAll() {

  const REAL_DATA = useRecoilValue(userListState)

  return (
  <div className={classes.userContainer}>
    <div className={`${classes.box} ${classes.top}`}>
      
   {REAL_DATA.map((user,index)=>{
      return (<User key={index} userName={user.username} done={"30%"}/>)
    })}
    </div>
  </div>
  
  )
}

export default UserAll;
