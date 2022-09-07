import React from 'react';
import classes from "./RoomStatus.module.css";
import { FaUsers } from "react-icons/fa";
import {MdTimer} from "react-icons/md";
import { MdHowToVote } from "react-icons/md";

function RoomStatus({userCount,timer,votingStatus,restTime}) {
  let isVoting;
  if(votingStatus === "on"){
    isVoting = false;
  }else {
    isVoting = true;
  }
  return (
    <div className={classes.roomStatus}>
    <FaUsers size="50px" className={classes.icon}/><p className={classes.value}>{userCount}</p>
    <MdTimer size="50px" className={classes.icon}/><p className={classes.value}>{timer}min</p>
    <MdHowToVote size="50px" className={classes.icon}/><p className={classes.value}>{votingStatus}</p>
   { isVoting && <><img className={classes.restIcon}src="/rest.png"/><p className={classes.value}>{restTime}min</p></>}
    </div>
  )
}

export default RoomStatus