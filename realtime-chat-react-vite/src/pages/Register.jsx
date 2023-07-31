import React from 'react';
import addImg from '../img/add-image.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
          <p className="text-orange-400">
            มีบัญชีอยู่แล้ว? <span>เข้าสู่ระบบ</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
