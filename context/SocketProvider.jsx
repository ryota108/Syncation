import React, { createContext } from "react";
import socketio,  { io } from "socket.io-client";


const socket = io("ws://localhost:8000", { path: "/ws/socket.io/"})
// const socket = socketio.connect("ws://localhost:8000", { path: "/ws/socket.io/"})
export const SocketContext = createContext(socket)

const SocketProvider = (props) => {
    return (
        <SocketContext.Provider value={socket} {...props}/>
    )
}

export default SocketProvider;