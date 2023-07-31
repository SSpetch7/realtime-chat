import React from 'react';
import Profile from '../img/profile.jpg';
const Search = () => {
  return (
    <div className="search border-b-2 border-b-indigo-600">
      <div className="searchForm">
        <input
          className="bg-transparent border-none outline-none border-white placeholder-gray-500"
          placeholder="ค้นหาผู้ใช้งาน"
          type="text"
        />
      </div>
      <div className="userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-orange-500">
        <img
          className="w-14 h-14 rounded-full object-cover "
          src={Profile}
        ></img>
        <div className="userChatInfo">
          <span className="text-base font-bold">Petch</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
