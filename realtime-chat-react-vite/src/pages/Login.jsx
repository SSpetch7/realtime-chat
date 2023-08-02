import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const [err, SetErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.log(err);
      SetErr(true);
    }
  };

  return (
    <div className="formContainer bg-orange-300 h-screen flex justify-center items-center">
      <div className="formWrapper bg-white px-16 py-14 rounded-md gap-5 text-center w-3/12 min-w-96 flex flex-col">
        <span className="text-orange-500 text-2xl font-bold ">ZipZip Chat</span>
        <span className="text-orange-500 text-base ">เข้าสู่ระบบ</span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
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
          <button className="bg-orange-400 py-2 rounded-sm text-white font-bold ">
            เข้าสู่ระบบ
          </button>
          {err && <span>ข้อมูลผิดพลาด</span>}
          <p className="text-orange-400">
            ยังไม่บัญชี?
            <Link to="/register">
              <span className="underline text-blue-500">สมัครใช้งาน</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
