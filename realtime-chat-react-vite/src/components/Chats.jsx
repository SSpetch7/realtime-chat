import React from 'react';
import Profile from '../img/profile.jpg';

const Chats = () => {
  return (
    <div className="chats">
      <div className="userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-orange-500">
        <img
          className="w-14 h-14 rounded-full object-cover "
          src={Profile}
        ></img>
        <div className="userChatInfo">
          <span className="text-base font-bold">Petch</span>
          <p className="text-base text-gray-200">Hello</p>
        </div>
      </div>
      <div className="userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-orange-500">
        <img
          className="w-14 h-14 rounded-full object-cover "
          src={Profile}
        ></img>
        <div className="userChatInfo">
          <span className="text-base font-bold">Petch</span>
          <p className="text-base text-gray-200">Hello</p>
        </div>
      </div>
      <div className="userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-orange-500">
        <img
          className="w-14 h-14 rounded-full object-cover "
          src={Profile}
        ></img>
        <div className="userChatInfo">
          <span className="text-base font-bold">Petch</span>
          <p className="text-base text-gray-200">Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
