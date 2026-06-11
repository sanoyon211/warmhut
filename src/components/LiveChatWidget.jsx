import React, { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { socket } from '../lib/socket';
import { useSession } from '../lib/auth-client';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const LiveChatWidget = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userId, setUserId] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Initialize User ID
  useEffect(() => {
    let id = session?.user?.id;
    if (!id) {
      id = localStorage.getItem('guest_chat_id');
      if (!id) {
        id = 'guest_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('guest_chat_id', id);
      }
    }
    setUserId(id);
  }, [session]);

  // Fetch chat history
  useEffect(() => {
    if (!userId) return;

    const fetchChat = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/chat/${userId}`);
        if (res.data && res.data.messages) {
          setMessages(res.data.messages);
          setUnreadCount(res.data.unreadByUser || 0);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };
    fetchChat();

    socket.emit('joinChat', userId);

    const handleNewMessage = ({ message }) => {
      setMessages((prev) => [...prev, message]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    };

    socket.on('newChatMessage', handleNewMessage);

    return () => {
      socket.off('newChatMessage', handleNewMessage);
    };
  }, [userId, isOpen]);

  // Mark as read when opened
  useEffect(() => {
    if (isOpen && unreadCount > 0 && userId) {
      setUnreadCount(0);
      axios.patch(`${BACKEND_URL}/api/chat/${userId}/read`, { reader: 'user' }).catch(console.error);
    }
  }, [isOpen, unreadCount, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !userId) return;

    const text = inputText.trim();
    setInputText('');

    try {
      await axios.post(`${BACKEND_URL}/api/chat/message`, {
        userId,
        userName: session?.user?.name || 'Guest',
        text,
        sender: 'user'
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-4 flex flex-col h-[450px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold">Live Support</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 my-auto text-sm">
                <p>👋 Hi there!</p>
                <p>How can we help you today?</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user' ? 'bg-olive text-white self-end rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 self-start rounded-bl-none shadow-sm'}`}>
                  <p>{msg.text}</p>
                  <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-olive-100' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-olive/20"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-olive text-white flex items-center justify-center disabled:opacity-50 hover:bg-gray-900 transition-colors"
            >
              <FiSend className="w-4 h-4 ml-[-2px]" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-900 hover:bg-olive transition-colors text-white rounded-full flex items-center justify-center shadow-2xl relative"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default LiveChatWidget;
