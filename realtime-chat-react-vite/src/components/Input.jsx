import React, { useContext, useEffect, useState } from 'react';
import Img from '../img/send-image.png';
import File from '../img/send-file2.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [imageURL, setImageURL] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (img === null) return;
    const newImageURL = URL.createObjectURL(img);
    setImageURL(newImageURL);
  }, [img]);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (text !== '') {
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    }

    if (text !== '') {
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
    }
    setText('');
    setImg(null);
  };

  console.log('img');
  console.log(img);
  return (
    <div className="input h-16 p-2 bg-white flex justify-between">
      <input
        className="w-full outline-none border-0 text-lg text-slate-800"
        type="text"
        placeholder="พิมพ์ข้อความ..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <img src={imageURL} />

      <div className="send flex items-center gap-2">
        <img
          className="cursor-pointer"
          src={File}
          style={{ width: '24px', height: '22px' }}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label className="cursor-pointer" htmlFor="file">
          <img src={Img} style={{ width: '50px' }} />
        </label>
        <button
          className="button border-0 py-2 px-6 bg-orange-400 rounded text-white"
          onClick={handleSend}
        >
          ส่ง
        </button>
      </div>
    </div>
  );
};

export default Input;
