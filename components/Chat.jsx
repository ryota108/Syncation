import React from 'react'
import styles from "../styles/Chat.module.css";
import Comment from './Comment';
import {IoChatbubblesOutline} from "react-icons/io5";

function Chat() {
  const DummyChat = [
    {
    name:"Ryota",time :"20:00", message:"message" 
  },
    {
    name:"Manato",time :"20:00", message:"message" 
  },
    {
    name:"TEST",time :"20:00", message:"message" 
  }
]
  return (
    <>
    <h1 className={styles.chatTitle}>Chat<IoChatbubblesOutline color='deeppink'/></h1>
    {DummyChat.map((comment,index)=>{return ( <Comment name={comment.name} time={comment.time} message={comment.message} key={index} />)})}

    </>
  )
}

export default Chat