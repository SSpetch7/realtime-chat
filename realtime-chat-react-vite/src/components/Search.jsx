import React, { useState, useContext } from 'react';
import Profile from '../img/profile.jpg';
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

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

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername('');
  };

  return (
    <div className="search border-b-2 border-b-white">
      <div className="searchForm pl-3 py-3">
        <input
          className="bg-transparent border-none outline-none border-white placeholder-gray-500"
          placeholder="ค้นหาผู้ใช้งาน"
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
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
