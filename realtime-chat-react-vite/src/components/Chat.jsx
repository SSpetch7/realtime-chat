import React from 'react';
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className="chat ">
      <div className="chatInfo h-20 bg-orange-200 flex items-center p-2 text-gray-500 font-bold">
        <span className="">Pech</span>
        <div className="chatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
