// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/mbti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue }),
      });
      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen bg-black-50 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-primary mb-8">당신의 성격을 입력하면 MBTI를 알려드립니다.</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="당신의 성격을 입력해주세요."
          className="w-96 h-32 p-4 rounded-lg shadow-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary text-black"
        />
        <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white font-medium shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">
          결과 보기
        </button>
      </form>
      {result && (
        <div className="flex flex-col items-center mt-8">
          <p className="text-4xl font-bold">{result.mbti}</p>
          <div className="flex space-x-2 mt-2">
            <span role="img" aria-label="heart" className="text-2xl">
              {result.emoji}
            </span>
          </div>
          <p className="text-lg font-medium mt-4">오늘의 운세: {result.fortune}</p>
        </div>
      )}
    </div>
  );
}
