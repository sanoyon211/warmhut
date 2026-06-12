import React from 'react';
import { Link } from 'react-router';
import { FaQuestionCircle, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
    <div className="text-8xl mb-6 flex justify-center text-gray-300"><FaQuestionCircle /></div>
    <h1 className="text-8xl font-black text-olive mb-2">404</h1>
    <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
    <p className="text-gray-400 max-w-sm mb-8 text-sm leading-relaxed">
      Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
    </p>
    <div className="flex gap-x-3">
      <Link to="/"><button className="px-6 py-3 bg-olive text-white rounded-2xl font-bold text-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"><FaArrowLeft /> Go Home</button></Link>
      <Link to="/caps"><button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors">Browse Products</button></Link>
    </div>
  </div>
);

export default NotFound;
