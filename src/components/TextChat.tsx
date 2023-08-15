import React, { SyntheticEvent, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dancingRobot from "../../public/robot-dancing.gif";
import eva from "../../public/eva.gif";

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
}

const TextChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [isFirstRender, setIsFirstRender] = useState(true); //
  const isScrolledRef = useRef(false); // New
  const [isApiKeyAvailable, setIsApiKeyAvailable] = useState(true); //change the state to false when you dont wanna use openaiapi or to true to switch it on
  const [userSentFirstMessage, setUserSentFirstMessage] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setMessage("");
    setChatMessages([]);
    setUserSentFirstMessage(false); // Reset the flag so the initial message is shown again
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: message,
      isUser: true, // This message is from the user
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage(""); // Clear the input field after sending the message

    if (!userSentFirstMessage) {
      setUserSentFirstMessage(true); // Update the state to indicate that the user sent the first message
    }

    if (isApiKeyAvailable) {
      const data = {
        type: "text",
        message,
      };
      try {
        const res = await fetch("/api/openai", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const responseData = await res.json();
        // Handle server response here
        if (responseData?.text) {
          const newSupportMessage: ChatMessage = {
            id: Date.now(),
            text: responseData.text,
            isUser: false, // This message is from the support (not the user)
          };
          setChatMessages((prevMessages) => [
            ...prevMessages,
            newSupportMessage,
          ]);
        }
        setMessage(""); // Clear the input field after sending the message
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color for the button
      const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-purple-500",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setButtonColor(randomColor);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if it's the first render
    if (isFirstRender) {
      // Set a timeout to mark isFirstRender as false after the falling animation duration
      const timeoutId = setTimeout(() => {
        setIsFirstRender(false);
      }, 2000);

      // Clear the timeout when the component is unmounted or updated
      return () => clearTimeout(timeoutId);
    }
  }, [isFirstRender]);

  useEffect(() => {
    if (isScrolledRef.current) {
      // Scroll to the bottom of the chat container after new messages are added
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current?.scrollHeight,
        behavior: "smooth",
      });
    } else {
      isScrolledRef.current = true; // Mark that scrolling has been performed after the initial render
    }
  }, [chatMessages]);

  return (
    <>
      {!isOpen && (
        <motion.button
          className={`fixed bottom-20 right-14 text-white rounded-full h-32 w-32  flex items-center justify-center ${buttonColor}`}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.7 }}
          onClick={toggleChat}
          initial={isFirstRender ? { y: -1000 } : { y: 0 }} // Initial position off-screen on the first render, otherwise on the screen
          animate={{ y: 0 }} // Final position at y = 0 (on the screen)
          transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring animation
        >
          <Image
            src={dancingRobot}
            alt="Dancing Robot"
            className="h-full w-full"
            layout="fill"
            objectFit="contain"
          />
        </motion.button>
      )}
      {isOpen && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-72">
          <div className="flex justify-end items-center mb-3">
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              Close
            </button>
          </div>
          <div ref={chatContainerRef} className="h-48 overflow-y-auto mb-4">
            <AnimatePresence>
              <div className="">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-2 my-2 rounded-lg  ${
                      msg.isUser
                        ? "bg-blue-200 text-blue-800"
                        : "bg-blue-200 text-gray-700"
                    }  whitespace-pre-wrap block  break-words`}
                    style={{
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                      marginBottom: "8px", //margin to create separation between messages
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {userSentFirstMessage && ( // Hide the phrase and image after the first message
              <></>
            )}
            {!userSentFirstMessage && (
              <>
                <p className="text-slate-600 flex justify-center">
                  How can I assist you?
                </p>
                <div className="flex justify-center items-center">
                  <Image
                    className="w-40"
                    src={eva}
                    alt="eva"
                    width={120}
                    height={200}
                  />
                </div>
              </>
            )}
          </div>
          <form onSubmit={onSubmit} className="flex">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="flex-1 rounded-l-lg border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500 bg-white text-gray-800 resize-none"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 transition duration-300 ease-in-out"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default TextChat;
