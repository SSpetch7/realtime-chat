import React, { useContext, useEffect, useRef } from 'react';
import ImgA from '../img/profile3.jpg';
import ImgB from '../img/profile.jpg';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import moment from 'moment';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const jsDate = message.date.toDate();
  const relativeTime = moment(jsDate).fromNow();

  const hours = jsDate.getHours();
  const minutes = jsDate.getMinutes();
  const seconds = jsDate.getSeconds();
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const timeDifferenceInSeconds = moment().diff(jsDate, 'seconds');
  const isMoreThanAnHour = timeDifferenceInSeconds > 3600;

  let formattedTimeOrDate;
  if (isMoreThanAnHour) {
    const isMoreThanOneDay = timeDifferenceInSeconds > 86400;
    if (isMoreThanOneDay) {
      formattedTimeOrDate = moment(jsDate).format('YYYY-MM-DD');
    } else {
      formattedTimeOrDate = moment(jsDate).format('HH:mm:ss');
    }
  } else {
    formattedTimeOrDate = relativeTime;
  }

  return (
    <div ref={ref}>
      {message.senderId === currentUser.uid ? (
        <div
          className={`message flex flex-row-reverse gap-5 mb-5 ${
            message.senderId === currentUser.uid && 'owner'
          }`}
        >
          <div className="messageInfo flex flex-col ">
            <img
              className="bg-white  object-cover border-none h-10 w-10 rounded-full"
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
            />
          </div>
          <div className="messageContent flex flex-col items-end gap-2 max-w-08">
            {message.text !== '' && (
              <p className="bg-orange-300 text-white py-2 px-5 rounded-l-lg rounded-br-lg border-2 border-orange-300 max-w-max">
                {message.text}
              </p>
            )}

            {message.img && (
              <img
                // className="bg-white  object-cover border-none h-10 w-10 rounded-full"
                className="bg-white  border-none w-2/4"
                src={message.img}
              />
            )}
            <span className="text-xs text-gray-400 font-light">
              {formattedTimeOrDate}
            </span>
          </div>
        </div>
      ) : (
        <div className={`message client flex flex-row gap-5 mb-5 `}>
          <div className="messageInfo flex flex-col text-gray-400 font-light">
            <img
              className="bg-white  object-cover border-none h-10 w-10 rounded-full"
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
            />
          </div>
          <div className="messageContent flex flex-col items-start gap-2 max-w-08">
            {message.text !== '' && (
              <p className="bg-white py-2 px-5 rounded-r-lg rounded-bl-lg border-2 border-orange-300">
                {message.text}
              </p>
            )}
            {message.img && (
              <img className="bg-white  border-none w-2/4" src={message.img} />
            )}
            <span className="text-xs text-gray-400 font-light">
              {formattedTimeOrDate}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
