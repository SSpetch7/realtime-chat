import React, { useState } from 'react';
import addImg from '../img/add-image.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [err, SetErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log(error);
          SetErr(true);
        },
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          });
        }
      );
    } catch (err) {
      console.log(err);
      SetErr(true);
    }
  };

  return (
    <div className="formContainer bg-orange-300 h-screen flex justify-center items-center">
      <div className="formWrapper bg-white px-16 py-14 rounded-md gap-5 text-center w-3/12 min-w-96 flex flex-col">
        <span className="text-orange-500 text-2xl font-bold ">ZipZip Chat</span>
        <span className="text-orange-500 text-base ">สมัครใช้งาน</span>

        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <input
            className="p-3 border-b border-orange-300"
            type="text"
            placeholder="Display name"
          />
          <input
            className="p-3 border-b border-orange-300"
            type="email"
            placeholder="Email"
          />
          <input
            className="p-3 border-b border-orange-300"
            type="password"
            placeholder="Password"
          />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label className="flex items-center cursor-pointer" htmlFor="file">
            <img className="w-10" src={addImg} alt="" />
            <span className="pl-2 text-orange-500 text-base ">
              เพิ่มภาพโปรไฟล์
            </span>
          </label>
          <button className="bg-orange-400 py-2 rounded-sm text-white font-bold ">
            สมัคร
          </button>
          {err && <span>ข้อมูลผิดพลาด</span>}
          <p className="text-orange-400">
            มีบัญชีอยู่แล้ว?
            <Link to="/login">
              <span className="underline text-blue-500">เข้าสู่ระบบ</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
