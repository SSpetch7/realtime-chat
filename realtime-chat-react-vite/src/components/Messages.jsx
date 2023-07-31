import React from 'react';
import Message from './Message';

const Messages = () => {
  return (
    <div className="messages  bg-orange-100 p-2 overflow-y-auto">
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
