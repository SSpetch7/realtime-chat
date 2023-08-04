import React, { useEffect, useState, useContext } from 'react';
import Profile from '../img/profile.jpg';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            className="userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-orange-500"
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="w-14 h-14 rounded-full object-cover "
              src={chat[1].userInfo.photoURL}
            ></img>
            <div className="userChatInfo">
              <span className="text-base font-bold">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-base text-gray-200">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
