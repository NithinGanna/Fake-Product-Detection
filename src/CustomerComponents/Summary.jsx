import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CustomerPostNavBar } from './CustomerPostNavBar';

const Summary = () => {
  const [summarizedText, setSummarizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false); // State to track whether an image is uploaded

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setImageUploaded(true); // Set imageUploaded to true when an image is uploaded
      } catch (error) {
        setError(error.message);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSummarizeClick = async () => {
    try {
      setIsLoading(true);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput.files.length > 0) {
        const imageURL = URL.createObjectURL(fileInput.files[0]);
        const ocrText = await recognizeText(imageURL);
        const isMedical = await checkIfMedical(ocrText);
        if (isMedical) {
          const summary = await summarizeMedicalText(ocrText);
          setSummarizedText(summary);
          setError('');
        } else {
          setSummarizedText('');
          setError('Please provide only medical-related text.');
        }
      } else {
        setError('Please select an image file.');
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const recognizeText = async (imageURL) => {
    try {
      const { data: { text } } = await Tesseract.recognize(
        imageURL,
        'eng',
        { logger: m => console.log(m) }
      );
      return text;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while recognizing text from the image.');
    }
  };

  const checkIfMedical = async (text) => {
    const API_KEY = "AIzaSyDqTPDOSvT5O0E0FmM3G-At2yaWHZ3XZOk";
    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const checkText = text + " whether it belongs to medical or not by sending text whether it belongs to medical or not , just say yes or no , only one word answer";
      const result = await model.generateContent(checkText);
      const response = await result.response;
      const responseText = response.text().toLowerCase();
      return responseText.includes('yes');
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while checking if the text is medical.');
    }
  };

  const summarizeMedicalText = async (text) => {
    const API_KEY = "AIzaSyDqTPDOSvT5O0E0FmM3G-At2yaWHZ3XZOk";
    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const summary = text+"Think you are doctor or the only guide , give the insights and remarks on the report and alter the person based on the values and the problems that might be faced in points in each line in short";
      const result = await model.generateContent(summary);
      const response = await result.response;
      const summarized = response.text();
      return summarized;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while summarizing the text.');
    }
  };

  return (
    <>
      <CustomerPostNavBar />
      <div className="container mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold mb-4">Medical Report Summarizer</h2>
        <div className="flex items-center justify-center">
        <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200 hover:text-blue-700">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.75 2a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v2.798h2.5a1.75 1.75 0 011.75 1.75v10.704a1.75 1.75 0 01-1.75 1.75h-10.5a1.75 1.75 0 01-1.75-1.75V6.548A1.75 1.75 0 013.75 4H6.5V2.75a.75.75 0 01.75-.75zM5.5 6.25v2.548c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6.25h2.25v2.798a.25.25 0 01-.25.25H3.75a.25.25 0 01-.25-.25V6.25h2.25zM5 12.25a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM10 12.25a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM5 14.75a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="mt-2 text-base leading-normal">
              Select Image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        {error && (
          <div className="mt-4 text-red-600">{error}</div>
        )}
        {imageUploaded && ( // Show this section only if an image is uploaded
          <>
            {summarizedText && (
              <div className="mt-4 border border-gray-300 rounded p-4">
                <h3 className="text-xl font-bold mb-2">Summary:</h3>
                {summarizedText.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
            )}
            <button
              onClick={handleSummarizeClick}
              disabled={isLoading}
              className={`mt-4 bg-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
            >
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Summary;
