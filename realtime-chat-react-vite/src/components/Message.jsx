import React from 'react';
import ImgA from '../img/profile3.jpg';
import ImgB from '../img/profile.jpg';

const Message = () => {
  return (
    <div className="message owner flex flex-row-reverse gap-5 mb-5">
      <div className="messageInfo flex flex-col text-gray-400 font-light">
        <img
          className="bg-white  object-cover border-none h-10 w-10 rounded-full"
          src={ImgA}
        />
        <span>just now</span>
      </div>
      <div className="messageContent flex flex-col items-end gap-2 max-w-08">
        <p className="bg-orange-300 text-white py-2 px-5 rounded-l-lg rounded-br-lg border-2 border-orange-300 max-w-max">
          Hello
        </p>
        {/* <p className="bg-white py-2 px-5 rounded-r-lg rounded-bl-lg border-2 border-orange-300">
          Hello
        </p> */}
        <img
          //   className="bg-white  object-cover border-none h-10 w-10 rounded-full"
          className="bg-white  border-none w-2/4"
          src={ImgB}
        />
      </div>
    </div>
  );
};

export default Message;
