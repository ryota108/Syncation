import React, { useRef, useState, useContext } from "react";
import { hostState, userListState, taskState, roomState } from "../recoil/atom";
import Router from "next/router";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { MdHowToVote } from "react-icons/md";
import { SocketContext } from "../context/SocketProvider";
import { io } from "socket.io-client";
import { AiOutlinePlus, AiFillSetting, AiOutlineSetting } from "react-icons/ai";
import { FaTasks, FaUserTie } from "react-icons/fa";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { IoTimerOutline } from "react-icons/io5";
import classes from "../styles/launchRoom.module.css";
import Task from "../components/Task";
import TaskAll from "../components/TaskAll";


function LaunchRoom() {
  const host = useRecoilValue(hostState);
  const setHost = useSetRecoilState(hostState);
  const users = useRecoilValue(userListState)
  const setUsers = useSetRecoilState(userListState)
  const hostNameRef = useRef(null);
  const taskRef = useRef(null);
  const [roomInfo,setRoomInfo ] = useRecoilState(roomState);
  const [time, setTime] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [isResting,setIsResting] = useState(false)
  const [isTask, setIsTask] = useState(false);
  const setTasks = useSetRecoilState(taskState);
  const tasks = useRecoilValue(taskState);
  const socket = useContext(SocketContext)
  
  console.log(socket)

  const hostSubmitHandle = async () => {

    /* ルームIDの発行 */

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
            "request_user": {
              "username": hostNameRef.current.value,
              "status": "player",
              "room_id": "string",
              "is_host": true
            },
            "request_room": {
              "host_id": "string",
              "timer": time,
              "milisecond": "0",
              "num": 0,
              "title": "test",
              "mode": "chat"
            }
          }
      )};
    
    fetch('http://localhost:8000/host', requestOptions)
    .then(response => response.json())
    .then(res => { 
      console.log(res)
      setRoomInfo({id:res.room_id})

       /* ソケット通信によるルーム別の参加 */

       socket.emit("join_room", {
        "roomId": res.room_id,
        "username": hostNameRef.current.value
      }, (response) => {
      if(response.result === "Success") {
      setUsers([
        ...users,
        {
        "username": hostNameRef.current.value,
        "status": "player",
        "room_id": res.room_id,
        "is_host": true
        }])
      }})

      /*URLの遷移 */
      Router.push(`/rooms/${res.room_id}`);
    })
    .catch(err => console.log(err))
  

      // setUsers([
      //   ...users,
      //   {
      //     userName: hostNameRef.current.value,
      //     roomId: "test",
      //   }
      // ])
    
    // Router.push(`/`);
    // socket.on("enter", ({user}) => {
    //   console.log(`${user}がJoinしました。`)
    // })
  };

  const formHandle = (e) => {
    e.preventDefault();
  };

  const timeChangeHandler = (e) => {
    setTime(e.target.value);
  };
  const restTimeChangeHandler = (e) => {
    setRestTime(e.target.value);
  };

  const voteChangeHandler = () => {
    setIsVoting((prev) => !prev);
  };

  const restChangeHandler = () => {
    setIsResting((prev) => !prev);
  };

  const taskChangeHandler = () => {
    setIsTask((prev) => !prev);
  };

  const decreaseHandler = () => {
    if (time > 0) {
      setTime(+time - 1);
    }
  };
  const increaseHandler = () => {
    setTime(+time + 1);
  };

  const decreaseRestHandler = () => {
    if (+restTime > 0) {
      setRestTime(+restTime - 1);
    }
  };
  const increaseRestHandler = () => {
    setRestTime(+restTime + 1);
  };

  const addTaskHandler = () => {
    const id = Math.random().toString();
    if (taskRef.current.value !== "") {
      setTasks((prevState) => [
        ...prevState,
        { id: id, task: taskRef.current.value },
      ]);
      taskRef.current.value = "";
    }
  };

  return (
    <>
      <div className="Modal">
        <h1 className="createRoom_title">
          Create the Room <AiOutlineSetting className="setting big" />
          <AiOutlineSetting className="setting mini" />
        </h1>
        <form className="createRoom_form" onSubmit={formHandle}>
          <div className="hostInput_area">
            <label>
              <FaUserTie />
              Host <input ref={hostNameRef} placeholder="name" />
            </label>
          </div>
          <div className="timeInput_explain">
            <h1 className="timeInput_label">
              <IoTimerOutline className="timeInput_icon" />
              Working Time
            </h1>
          </div>
          <h1 className="timeInput">
            <RiArrowLeftSLine
              onClick={decreaseHandler}
              size="60px"
              className="leftArrow"
            />
            <input
              value={time}
              onChange={timeChangeHandler}
              className="timeInput_hidden"
            />
            <p>min</p>
            <RiArrowRightSLine
              onClick={increaseHandler}
              size="60px"
              className="rightArrow"
            />
          </h1>
          <ul className="setting_btns">
            <li onClick={voteChangeHandler}>
              <p className="voteBtn_explain">vote</p>
              <a>
                <MdHowToVote
                  className={isVoting ? "vote voteIcon_on" : "vote"}
                />
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
                <img
                  src="/rest.png"
                  className={isResting ? "rest restIcon_on" : "rest"}
                />
              </a>
              {isResting ? (
                <p className="rest_status on">on</p>
              ) : (
                <p className="rest_status off">off</p>
              )}
            </li>
            <li onClick={taskChangeHandler}>
              <p className="taskBtn_explain">task</p>
              <a>
                <FaTasks className={isTask ? "task taskIcon_on" : "task"} />
              </a>
              {isTask ? (
                <p className="task_status on">on</p>
              ) : (
                <p className="task_status off">off</p>
              )}
            </li>
          </ul>
          {isResting && (
            <>
              <div className="timeInput_explain">
                <h1 className="restInput_label">
                  <img src="/rest.png" className="rest restIcon_time" />
                  Resting Time
                </h1>
              </div>
              <h1 className="timeInput restInput">
                <RiArrowLeftSLine
                  onClick={decreaseRestHandler}
                  size="60px"
                  color="white"
                  className="leftArrow"
                />
                <input
                  value={restTime}
                  onChange={restTimeChangeHandler}
                  className="timeInput_hidden"
                />
                <p>min</p>
                <RiArrowRightSLine
                  onClick={increaseRestHandler}
                  color="white"
                  size="60px"
                  className="rightArrow"
                />
              </h1>
            </>
          )}
          {isTask && (
            <>
            <div className="task_input">
              <label className="task_label">
                <FaTasks size="25px" /> Task{" "}
                <input type="text" ref={taskRef} placeholder="task" />
              </label>
              <button className="taskAddIcon" onClick={addTaskHandler}>
                <AiOutlinePlus
                  className="taskAdd_icon"
                  size="25px"
                />
              </button>
            </div>
          <TaskAll />
            </>
          )}
          <div className="btn blue submit" onClick={hostSubmitHandle}>
            <p>Submit</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LaunchRoom;
