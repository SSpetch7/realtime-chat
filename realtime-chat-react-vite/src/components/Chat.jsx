import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat ">
      <div className="chatInfo h-20 bg-orange-200 flex items-center p-2 text-gray-500 font-bold">
        <span className="">{data.user?.displayName}</span>
        <div className="chatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
