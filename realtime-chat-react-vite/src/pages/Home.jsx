import React from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
  return (
    <div className="bg-orange-300 h-screen flex items-center justify-center">
      <div className="border-solid border-2 overflow-hidden border-white rounded-md w-8/12 h-5/6 flex">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
