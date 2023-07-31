import React from 'react';
import Img from '../img/send-image.png';
import File from '../img/send-file2.png';

const Input = () => {
  return (
    <div className="input h-16 p-2 bg-white flex justify-between">
      <input
        className="w-full outline-none border-0 text-lg text-slate-800"
        type="text"
        placeholder="พิมพ์ข้อความ..."
      />
      <div className="send flex items-center gap-2">
        <img
          className="cursor-pointer"
          src={File}
          style={{ width: '24px', height: '22px' }}
        />
        <input type="file" style={{ display: 'none' }} id="file" />
        <label className="cursor-pointer" htmlFor="file">
          <img src={Img} style={{ width: '50px' }} />
        </label>
        <button className="button border-0 py-2 px-6 bg-orange-400 rounded text-white">
          ส่ง
        </button>
      </div>
    </div>
  );
};

export default Input;
