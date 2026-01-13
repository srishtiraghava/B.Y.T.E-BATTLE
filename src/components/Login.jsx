import React, { useState } from 'react';
import { Zap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Login = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Login successful!");
      setLoading(false);
      // navigate('/dashboard'); // ← change when real routing is ready
    }, 1200);
  };

  const handleGoogleLogin = () => {
    alert("Redirecting to Google Login...");
  };

  const darkGreen = '#059669';     // emerald-700
  const darkerGreen = '#047857';   // emerald-800

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 mb-8 py-3 px-4 rounded-xl font-semibold text-white transition-all active:scale-95 hover:brightness-110 shadow-md"
          style={{ backgroundColor: darkGreen }}
        >
          <ArrowLeft size={18} />
          Back to Homepage
        </button>

        {/* Card */}
        <div 
          className="p-8 rounded-2xl transition-all shadow-2xl"
          style={{
            backgroundColor: isDark ? '#111827' : '#ffffff',
            boxShadow: isDark ? '0 25px 50px -12px rgba(0,0,0,0.6)' : '0 20px 40px rgba(0,0,0,0.12)'
          }}
        >
          <div className="text-center mb-8">
            <div 
              className="inline-flex p-4 rounded-xl mb-5 shadow-lg"
              style={{ backgroundColor: darkGreen }}
            >
              <Zap className="text-white" size={36} />
            </div>
            
            <h1 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: isDark ? '#34D399' : darkerGreen }}
            >
              Byte Battle
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              Enter your credentials to join the battle
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600`}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
                  } transition-colors`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-600 text-emerald-600 focus:ring-emerald-600"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Remember me
                </span>
              </label>

              <a 
                href="#" 
                className={`text-sm font-medium ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'}`}
              >
                Forgot password?
              </a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
              style={{ backgroundColor: darkGreen }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>OR</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
          </div>

          <button 
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all active:scale-[0.98] ${
              isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-900'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className={`mt-8 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <a 
              href="#" 
              className={`font-semibold ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'}`}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;