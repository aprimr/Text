import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useAuthRedirect from "../hooks/useAuthRedirect";

import { FaGithub } from "react-icons/fa";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useAuthRedirect();

  const handleJoin = () => {
    if (!username.trim()) {
      toast.info("Please enter your username");
      return;
    }

    //set user to localstorage
    localStorage.setItem("user", JSON.stringify({ name: username }));

    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-700 px-0 sm:px-4 overflow-hidden">
      <div className="bg-white w-screen h-screen sm:w-full sm:h-[80vh] sm:max-w-6xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-auto sm:m-4">
        {/* Main content */}
        <div className="flex flex-col items-center justify-center h-full pt-20 sm:pt-0 relative">
          {/* Logo */}
          <div className="absolute top-4 left-6 text-blue-600 font-extrabold text-2xl sm:text-3xl">
            Text.
          </div>

          {/* GitHub */}
          <div className="absolute top-4 right-6 flex items-center text-blue-600 text-xl sm:text-2xl">
            <a
              href="https://github.com/aprimr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>

          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-blue-600 text-center mb-8 sm:mb-10">
            Join Public Chat Room
          </h1>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full max-w-md p-4 sm:p-5 border-2 border-indigo-300 rounded-md mb-4 focus:outline-none focus:border-0 focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg"
          />

          <button
            onClick={handleJoin}
            className="w-full max-w-md bg-blue-600 cursor-pointer text-white py-3 sm:py-4 rounded-md hover:bg-blue-700 transition text-xl sm:text-2xl font-normal flex items-center justify-center gap-2"
          >
            <span>Join Chat</span>
            <HiOutlineChatBubbleBottomCenterText className="text-2xl sm:text-3xl" />
          </button>
          <footer className="absolute -bottom-5 text-xs sm:text-base font-semibold text-blue-800">
            © 2025 Text.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
