import React, { useState } from 'react';
import Profile from '../img/profile.jpg';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  return (
    <div className="search border-b-2 border-b-indigo-600">
      <div className="searchForm pl-3 py-3">
        <input
          className="bg-transparent border-none outline-none border-white placeholder-gray-500"
          placeholder="ค้นหาผู้ใช้งาน"
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {err && <span>ไม่พบผู้ใช้!</span>}
      {user && (
        <div
          className="userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-orange-500"
          onClick={handleSelect}
        >
          <img
            className="w-14 h-14 rounded-full object-cover "
            src={user.photoURL}
          ></img>
          <div className="userChatInfo">
            <span className="text-base font-bold">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
