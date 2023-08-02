import React, { useContext } from 'react';
import Profile from '../img/profile.jpg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center bg-orange-500 h-20 p-4 justify-between text-white">
      <span className="font-bold">ZipZip Chat</span>
      <div className="user flex items-center gap-4">
        <img
          className="bg-white  object-cover border-none h-10 w-10 rounded-full"
          src={currentUser.photoURL}
        ></img>
        <span className="font-medium">{currentUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-orange-400 text-white text-sm px-2 py-2 rounded"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Navbar;
