// RoomContext.js
import React, { createContext, useState } from 'react';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState("");
  const[name,setName] = useState("");

  return (
    <RoomContext.Provider value={{ room, setRoom , name , setName}}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
