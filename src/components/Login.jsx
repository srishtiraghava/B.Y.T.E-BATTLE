import React, { useState } from 'react';
import { Moon, Sun, ArrowLeft, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    alert("Redirecting to Google Login...");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>

      <div className="w-full max-w-md">
        {/* Back button */}
       <button 
  className={`flex items-center gap-2 mb-8 text-sm font-medium transition-opacity hover:opacity-70 ${isDark ? 'text-white-400' : 'text-white-600'}`}
  onClick={() => navigate('/')}
>
  <ArrowLeft size={16} />
  Back to home
</button>
{/* THEME TOGGLER — FIXED */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {isDark ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-blue-600" />  
            )}
          </button>

        {/* Main Card */}
        <div 
          className="p-8 rounded-2xl transition-colors"
          style={{
            backgroundColor: isDark ? '#1F2937' : '#fff',
            boxShadow: isDark ? 'none' : '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          <div className="text-center mb-8">
            {/* Logo */}
            <div 
              className="inline-flex p-3 rounded-xl mb-4"
              style={{
                backgroundColor: isDark ? '#EF4444' : '#3B82F6'
              }}
            >
              <Zap className="text-white" size={32} />
            </div>
            
            {/* Title */}
            <h1 
              className="text-3xl font-bold mb-2 tracking-wide"
              style={{
                color: isDark ? '#F87171' : '#3B82F6'
              }}
            >
              ByteBattle
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Sign in to start battling
            </p>
          </div>

          {/* Google Sign In Button */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-semibold transition-all active:scale-95 hover:opacity-90"
            style={{
              backgroundColor: isDark ? '#374151' : '#1F2937',
              color: '#fff'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
         

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>OR</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>

          {/* Quick Battle Button */}
          <button 
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all active:scale-95 hover:opacity-90 flex items-center justify-center gap-2"
            style={{
              backgroundColor: isDark ? '#10B981' : '#3B82F6',
              color: '#fff'
            }}
          >
            <Zap size={18} />
            Continue as Guest
          </button>

          {/* Footer */}
          <p className={`mt-8 text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            By continuing, you agree to our{' '}
            <a href="#" className="underline hover:opacity-70">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline hover:opacity-70">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;