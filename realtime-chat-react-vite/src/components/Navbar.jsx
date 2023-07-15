import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center bg-orange-500 h-20 p-4 justify-between text-white">
      <span className="font-bold">ZipZip Chat</span>
      <div className="user flex gap-4">
        <img className="bg-white  object-cover border-none h-12 w-12 rounded-full"></img>
        <span>Petch</span>
        <button className="bg-orange-400 text-white text-sm px-2 py-1 rounded">
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Navbar;
