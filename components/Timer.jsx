import { type } from 'os';
import React,{useState} from 'react';
import classes from "./Timer.module.css";


function Timer() {

  const [timer, setTimer] = useState("")
  const [startTime, setStartTime] = useState("");
  const time = 500;
  let barFill = "0%";
  barFill = Math.round((time / 1.7) * 100) + "%";

  const clickHandler = (e) => {
    if (timer === ""){
      return
    }
    const now = new Date()
    // 押した時間
    const test = now.getTime()
    setStartTime(new Date (test));
    // 押した時間のインスタンス
    const dateDemo = new Date (test)
    // 終了時間
    const min = dateDemo.setMinutes(dateDemo.getMinutes() + +timer )
    const result = new Date (min)
    console.log(result, startTime)
    // 開始時間
    const diff = result.getTime() - startTime.getTime();
    const calcHour = Math.floor(diff / 1000 / 60 / 60);
    const calcMin = Math.floor(diff / 1000 / 60) % 60;
    const calcSec = Math.floor(diff / 1000) % 60;

    console.log(`${calcHour}:${calcMin}`);
    // const result = new Date(min);
    // console.log(result);
  }

  //  開始時間と終了時間を基にタイマー作成
  const changeHandler = (event)=>{
    setTimer(event.target.value)
  }
  
  return (
  <>
  <button onClick={clickHandler}>Start</button>
  <input  value={timer} onChange={(e) => changeHandler(e)}/>
      {/* <div className={classes.box}>
        <div className={classes.percent}>
        <svg className={classes.circleZone}>
            <circle className={classes.percent} cx="300" cy="300" r="250"></circle>
            <circle
              style={{ strokeDashoffset: barFill }}
              cx="300"
              cy="300"
              r="250"
            ></circle>
          </svg>
          <div className="number">
            <h2>
             3
              <span>h</span>
            </h2>
          </div>
        </div>
      </div> */}
  </>
  )
}

export default Timer