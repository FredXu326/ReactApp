import io from "socket.io-client"
import React from "react";

const IP_ADDR = window.ip_address;

export const socket = io.connect(`ws://${IP_ADDR}:5001`, {
      transports: ["websocket"],
      cors: {
        origin: "http://0.0.0.0:3000",
      },
    });
export const SocketContext = React.createContext()