import React, { useEffect, useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useNavigate } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

const ChatPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useAuthRedirect();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user")).name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 to-blue-700">
      {/* Navbar - added sticky and top-0 for mobile */}
      <header className="sticky top-0 z-10 flex justify-between items-center p-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-60 bg-white border-b border-gray-200 sm:bg-transparent sm:border-0 sm:py-6">
        <div className="text-blue-600 font-extrabold text-2xl sm:text-3xl sm:text-white">
          Text.
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <div className="text-md sm:text-xl sm:text-white">{username}</div>
          <button
            onClick={handleLogout}
            className="bg-white p-1 text-blue-600 text-2xl rounded-md sm:text-2xl hover:bg-gray-100 cursor-pointer"
            aria-label="Logout"
          >
            <MdOutlineLogout />
          </button>
        </div>
      </header>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col items-center sm:px-6 md:px-10 px-0">
        <div className="flex-1 overflow-hidden flex flex-col bg-white w-full sm:max-w-5xl sm:rounded-3xl shadow-xl h-[80vh] sm:h-[calc(100vh-200px)]">
          {/* This container has a fixed height and scrolls with hidden scrollbar */}
          <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide h-full sm:max-h-[640px] px-3 py-4 sm:px-6 sm:py-5">
            {/* Chat Skeleton on loading */}
            {isLoading && ChatSkeleton()}

            {/* Message from others */}
            {/* <div className="flex flex-col items-start">
              <span className="text-sm w-full pl-1 text-blue-700 font-medium">
                Alice
              </span>
              <div className="bg-blue-200 text-black p-3 rounded-md max-w-xs sm:max-w-md">
                Hello! How are you doing today?
              </div>
            </div> */}

            {/* Message from current user */}
            {/* <div className="flex flex-col items-end">
              <span className="text-sm w-full flex justify-end pr-1 text-blue-700 font-medium">
                {username}
              </span>
              <div className="bg-blue-600 text-white p-3 rounded-md max-w-xs sm:max-w-md">
                APRIM REGMI
              </div>
            </div> */}
          </div>
        </div>
      </main>

      {/* Input Section */}
      <footer className="sticky bottom-0 sm:static w-full p-4 sm:px-8 sm:py-6 bg-white sm:bg-transparent">
        <div className="flex gap-2 sm:max-w-4xl w-full sm:mx-auto">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-4 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg bg-gray-100 sm:bg-white"
          />
          <button className="bg-blue-600 text-white px-5 py-4 rounded-md hover:bg-blue-700 sm:bg-white sm:text-blue-600 sm:hover:bg-gray-200 transition cursor-pointer">
            <LuSend className="text-2xl" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;

const TestMessage = () => {
  return (
    <div className="flex flex-col items-end">
      <span className="text-sm w-full flex justify-end pr-1 text-blue-700 font-medium">
        User
      </span>
      <div className="bg-blue-600 text-white p-3 rounded-md max-w-xs sm:max-w-md">
        lorem30
      </div>
    </div>
  );
};

const ChatSkeleton = () => {
  return (
    <div className="space-y-6 p-4">
      {/* Incoming message skeleton */}
      <div className="flex flex-col items-start space-y-2">
        <span className="h-4 w-24 bg-blue-100 rounded animate-pulse" />
        <div className="bg-blue-200 animate-pulse rounded-md p-3 max-w-xs sm:max-w-md w-full h-16" />
      </div>

      {/* Outgoing message skeleton */}
      <div className="flex flex-col items-end space-y-2">
        <span className="h-4 w-20 bg-blue-100 rounded animate-pulse" />
        <div className="bg-blue-300 animate-pulse rounded-md p-3 max-w-xs sm:max-w-md w-full h-16" />
      </div>

      {/* Incoming message skeleton */}
      <div className="flex flex-col items-start space-y-2">
        <span className="h-4 w-28 bg-blue-100 rounded animate-pulse" />
        <div className="bg-blue-200 animate-pulse rounded-md p-3 max-w-xs sm:max-w-md w-full h-20" />
      </div>

      {/* Outgoing message skeleton */}
      <div className="flex flex-col items-end space-y-2">
        <span className="h-4 w-20 bg-blue-100 rounded animate-pulse" />
        <div className="bg-blue-300 animate-pulse rounded-md p-3 max-w-xs sm:max-w-md w-full h-16" />
      </div>

      {/* Incoming message skeleton */}
      <div className="flex flex-col items-start space-y-2">
        <span className="h-4 w-28 bg-blue-100 rounded animate-pulse" />
        <div className="bg-blue-200 animate-pulse rounded-md p-3 max-w-xs sm:max-w-md w-full h-20" />
      </div>
    </div>
  );
};
