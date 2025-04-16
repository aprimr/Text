import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuthRedirect from "../hooks/useAuthRedirect";
import toNepaliTime from "../utils/toNepaliTime.util.js";

import { LuSend } from "react-icons/lu";
import { IoArrowDown } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

import { io } from "socket.io-client";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputContent, setInputContent] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef();
  const scrollRef = useRef();

  useAuthRedirect();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user"))?.name);
    setUserId(JSON.parse(localStorage.getItem("user"))?.userId);

    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socketRef.current = socket;

    // Set message loading to true
    setIsLoading(true);

    // Get previous messages
    socket.on("previous messages", (msgs) => {
      setMessages(msgs);
      setIsLoading(false);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputContent) {
      toast.info("Empty message!");
    }
    if (inputContent.trim() && socketRef.current) {
      socketRef.current.emit("message", {
        username,
        userId,
        content: inputContent,
      });
      setInputContent("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 to-blue-700">
      {/* Navbar */}
      <header className="sticky top-0 z-10 flex justify-between items-center p-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-60 bg-white border-b border-gray-200 sm:bg-transparent sm:border-0 sm:py-6">
        <div className="text-blue-600 font-extrabold text-2xl sm:text-3xl sm:text-white">
          Text.
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <div className="text-md sm:text-xl sm:text-white cursor-pointer">
            {username}
          </div>
          <button
            onClick={handleLogout}
            className="bg-white p-1 text-blue-600 text-2xl rounded-md sm:text-2xl hover:bg-gray-100 cursor-pointer"
            title="Logout"
          >
            <MdOutlineLogout />
          </button>
        </div>
      </header>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col items-center sm:px-6 md:px-10 px-0">
        <div className="flex-1 flex flex-col bg-white w-full sm:max-w-5xl sm:rounded-3xl shadow-xl h-[80vh] sm:h-[calc(100vh-200px)]">
          <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide h-full sm:max-h-[640px] px-3 py-4 sm:px-6 sm:py-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
            {/* Chat Skeleton on loading */}
            {isLoading && ChatSkeleton()}

            {/* Display Messages */}
            {messages.map((msg, index) => {
              const isSent = msg.userId === userId;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    isSent ? "items-end" : "items-start"
                  }`}
                >
                  <span
                    className={`flex text-sm w-full text-blue-700 font-medium ${
                      isSent ? "justify-end pr-1" : "justify-start pl-1"
                    }`}
                  >
                    {msg.username}
                  </span>
                  <div
                    className={`${
                      isSent
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-blue-200 text-black rounded-tl-none"
                    } p-3 rounded-xl max-w-xs sm:max-w-md`}
                  >
                    {msg.content}
                  </div>
                  <span
                    className={`text-xs text-gray-500 mt-0.5 ${
                      isSent ? "pr-1" : "pl-1"
                    }`}
                  >
                    {toNepaliTime(msg.createdAt)}
                  </span>
                </div>
              );
            })}
            {/* Ref element for auto-scroll */}
            <div ref={scrollRef}></div>
          </div>
        </div>
      </main>

      {/* Input Section */}
      <footer className="sticky bottom-0 sm:static w-full p-4 sm:px-8 sm:py-6 bg-white sm:bg-transparent">
        <div className="flex gap-2 sm:max-w-4xl w-full sm:mx-auto">
          <input
            type="text"
            onChange={(e) => setInputContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            value={inputContent}
            placeholder="Enter your message"
            className="flex-1 p-4 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg bg-gray-100 sm:bg-white"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-5 py-4 rounded-md hover:bg-blue-700 sm:bg-white sm:text-blue-600 sm:hover:bg-gray-200 transition cursor-pointer"
            title="Press enter to send"
          >
            <LuSend className="text-2xl" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;

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
