import { type } from 'os';
import React,{useState} from 'react';
import classes from "./Timer.module.css";


function Timer({onHelp}) {

  const [timer, setTimer] = useState("")
  const [startTime, setStartTime] = useState(new Date());

  
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

    // console.log(`${calcMin}`);
    onHelp(min)
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