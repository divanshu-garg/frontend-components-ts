import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
// import type React from 'react';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* 1. BACKGROUND DECORATION (Subtle Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      
      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        
        {/* ICON CONTAINER */}
        <div className="mb-8 flex justify-center">
          <div className="h-16 w-16 bg-red-50 rounded-2xl flex items-center justify-center rotate-3 shadow-sm border border-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* GIANT 404 TEXT */}
        <h1 className="text-8xl md:text-9xl font-black text-gray-900 tracking-tight mb-2">
          404
        </h1>

        {/* EXPLANATION */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Page not found
        </h2>
        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved. 
          Here are some helpful links:
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Secondary Button: Go Back */}
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          {/* Primary Button: Go Home */}
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 shadow-md shadow-red-200 transition-all active:scale-95"
          >
            <Home size={18} />
            Back to Dashboard
          </button>
        </div>

      </div>

      {/* FOOTER TEXT */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-400 text-sm">
          Error Code: 404_NOT_FOUND
        </p>
      </div>

    </div>
  );
};

export default Error404;