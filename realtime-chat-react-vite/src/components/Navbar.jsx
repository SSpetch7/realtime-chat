import React from 'react';
import Profile from '../img/profile.jpg';

const Navbar = () => {
  return (
    <div className="flex items-center bg-orange-500 h-20 p-4 justify-between text-white">
      <span className="font-bold">ZipZip Chat</span>
      <div className="user flex items-center gap-4">
        <img
          className="bg-white  object-cover border-none h-10 w-10 rounded-full"
          src={Profile}
        ></img>
        <span className="font-medium">Petch</span>
        <button className="bg-orange-400 text-white text-sm px-2 py-2 rounded">
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Navbar;
