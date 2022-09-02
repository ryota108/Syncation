import Router from "next/router"
import Link from "next/link"
import Image from "next/image"
import {MdOutlineTimer} from "react-icons/md"
import {MdHowToVote} from "react-icons/md"
import {FaTasks} from "react-icons/fa"
import {IoChatbubblesOutline} from "react-icons/io5"
const Home  = () => {

  return (
    <>
    <header>
      <ul className="header_links">
        <li>
    <img src="/logo.png" width="200px" height="100px"/>
        </li>
        <li className="header_link btn blue red">
          <Link href="/launchRoom">Create Room</Link>
        </li>
        <li className="header_link btn blue red">
          <Link className="header_link btn blue red" href="/login">Join Room</Link>
        </li>
      </ul>
    
    </header>
    <h1 className="explain_title">What is Syncation?</h1>
    <div className="explain">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    <div className="explain_container">
      <div className="sync_box">
    <img className="sync" src="/sync1.png" width="180px" height="180px"/>
    <p className="sync_explain">Synchronism</p>
      </div>
      <h1 className="explain_times">x</h1>
    <div className="motivation_box">
    <img className="motivation" src="/motivation.png" width="180px" height="180px"/>
    <p className="motivation_explain">Motivation</p>
    </div>
    </div>
    <p className="theme_explain">SyncationはSynchronism(共鳴)とmotivationを組み合わせた言葉で当アプリの特徴である</p>

    </div>
    
    <h1 className="function_title">Function</h1>
    <div className="function_container">
    <div className="function_box">
    <MdOutlineTimer  size="100px" className="timer_icon"/>
    <p className="function_explain">Timer</p>
    </div>
    <div className="function_box">
    <MdHowToVote  size="100px" className="timer_icon"/>
    <p className="function_explain">Vote</p>
    </div>
    <div className="function_box">
    <IoChatbubblesOutline size="100px" className="timer_icon"/>
    <p className="function_explain">Chat</p>
    </div>
    <div className="function_box">     
   <FaTasks  size="90px" className="timer_icon"/>
    <p className="function_explain">Tasks</p>
    </div>
    </div>
    <div className="line_container">
      <h1 className="line_title">Connect LINE</h1>

    </div>
      
    

    <div className="btn blue">
            <Link href="login">Join Room </Link>
          </div>
    <div className="btn blue" style={{marginTop:"50px"}}>
            <Link href="launchRoom">Create Room </Link>
          </div>
    </>
  )
}

export default Home
