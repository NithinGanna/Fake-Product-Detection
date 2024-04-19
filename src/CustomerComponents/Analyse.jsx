import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CustomerPostNavBar } from './CustomerPostNavBar';

const Analyse = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = 'AIzaSyDqTPDOSvT5O0E0FmM3G-At2yaWHZ3XZOk'; // Replace with your API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    setIsLoading(true);
    const response = await generateResponse(inputText);
    setChatHistory((prevChatHistory) => [...prevChatHistory, { message: inputText, fromUser: true }]);
    setChatHistory((prevChatHistory) => [...prevChatHistory, { message: response, fromUser: false }]);
    setInputText('');
    setIsLoading(false);
  };

  const generateResponse = async (query) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(query);
      const { response } = await result;
      return response.text();
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred while processing your request.';
    }
  };

  return (
    <>
    <CustomerPostNavBar/>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col h-64 overflow-y-auto mb-4">
          {chatHistory.map((message, index) => (
            <div key={index} className={`p-2 rounded-md shadow-md mb-2 ${message.fromUser ? 'bg-blue-100 text-blue-800 self-end' : 'bg-gray-100 text-gray-800'}`}>
              {message.message}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r hover:bg-blue-600 transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Analyse;
