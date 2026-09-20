import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { DuneBackground } from './DuneBackground';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      setLoading(true);
      const decoded: any = jwtDecode(credentialResponse.credential);
      const userEmail = decoded.email;
      const userName = decoded.name;

      console.log('✅ User logged in:', userName, userEmail);
      
      setTimeout(() => {
        onLogin();
      }, 500);
    } catch (err) {
      setError('Google authentication failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="flex min-h-screen bg-[#050b16] text-white overflow-hidden">
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-[#050b16]">
        <DuneBackground />
        
        <div className="relative z-10 p-12 text-center text-white">
            <h1 className="text-5xl font-black tracking-tighter mb-6 text-cyan-50 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]">
                PAYROLL MANAGEMENT <br/> SYSTEM
            </h1>
            <p className="text-cyan-300 font-bold text-lg max-w-sm mx-auto drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
                Secure, efficient, and precise payroll management for your organization.
            </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#000a16]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h2 className="text-6xl font-black mb-2 text-cyan-200 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]">Welcome</h2>
            <p className="text-cyan-400 text-sm">Sign in with Google</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="dark"
                size="large"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-200 text-sm bg-red-900/20 p-4 rounded-xl border border-red-500/30 text-center drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-cyan-300 text-sm text-center animate-pulse">
              Authenticating...
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
