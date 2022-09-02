import React, { useRef, useState } from "react";
import { hostState } from "../recoil/atom";
import Router from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MdHowToVote } from "react-icons/md";

function launchRoom() {
  const host = useRecoilValue(hostState);
  const setHost = useSetRecoilState(hostState);
  const hostNameRef = useRef(null);
  const [time, setTime] = useState(1);
  const [isVoting, setIsVoting] = useState(false);
  const [isResting,setIsResting] = useState(false)

  const hostSubmitHandle = () => {
    const roomId =
      new Date().getTime().toString(16) +
      Math.floor(Math.random()).toString(16);
    setHost({
      hostName: hostNameRef.current.value,
      roomId: roomId,
      time: time,
      isResting:isResting,
      isVoting:isVoting
    });
    Router.push(`/rooms/${roomId}`);
  };

  const formHandle = (e) => {
    e.preventDefault();
  };

  const timeChangeHandler = (e) => {
    setTime(e.target.value);
  };

  const voteChangeHandler = () => {
    setIsVoting((prev) => !prev);
  };

  const restChangeHandler = () => {
    setIsResting((prev) => !prev);
  };

  return (
    <>
      <div className="Modal">
        <h1 className="createRoom_title">Create the Room</h1>
        <form onSubmit={formHandle}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>
              Host <input ref={hostNameRef} />
            </label>
            <label>
              Time <input type="number" onChange={timeChangeHandler} />
            </label>
            <ul className="setting_btns">
              <li onClick={voteChangeHandler}>
                <p className="voteBtn_explain">vote</p>
                <a>
                  <MdHowToVote className = {isVoting ? "vote voteIcon_on":"vote"}/>
                </a>
                {isVoting ? (
                  <p className="vote_status on">on</p>
                ) : (
                  <p className="vote_status off">off</p>
                )}
              </li>
              <li onClick={restChangeHandler}>
              <p className="restBtn_explain">rest</p>
                <a>
                  <img src="/rest.png" className = {isResting ? "rest restIcon_on":"rest"}/>
                </a>
                {isResting ? (
                  <p className="rest_status on">on</p>
                ) : (
                  <p className="rest_status off">off</p>
                )}
              </li>
            </ul>
            {/* <div className={isVoting ?"vote_on_btn":"vote_off_btn"} onClick={voteChangeHandler}>
    <MdHowToVote  size="80px" className={isVoting ?"vote_on_icon":"vote_off_icon"}/> */}

            {/* </div> */}
          </div>
          <h1 style={{ display: "flex", alignItems: "center" }}>
            {time}
            <p>min</p>
          </h1>
          <div className="btn blue" onClick={hostSubmitHandle}>
            <p>Submit</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default launchRoom;
