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

  const checkIfMedical = async (text) => {
    const API_KEY = "AIzaSyDqTPDOSvT5O0E0FmM3G-At2yaWHZ3XZOk";
    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const checkText = text + " whether the text i gave is related to medical or not , just say yes or no , only one word answer";
      const result = await model.generateContent(checkText);
      const response = await result.response;
      const responseText = response.text().toLowerCase();
      return responseText.includes('yes');
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while checking if the text is medical.');
    }
  };

  const generateResponse = async (query) => {
    try {
      const isMedical = await checkIfMedical(query);
  
      if (isMedical) {
        // If the query is related to the medical field, generate a detailed answer
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const q=query+"Give user friendly response";
        const result = await model.generateContent(q);
        const { response } = await result;
        return response.text();
      } else {
        // If the query is not related to the medical field, return a message indicating so
        return 'Your question does not seem to be related to the medical field.';
      }
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred while processing your request.';
    }
  };
  
  
  

  return (
    <>
  <CustomerPostNavBar/>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-8">Analyse</h1>
    <div className="w-full max-w-xl p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
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