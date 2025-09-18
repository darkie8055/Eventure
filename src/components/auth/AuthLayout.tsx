"use client"

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left side - Hero Section - Fixed, no scroll */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-glow to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white h-full">
          <div className="max-w-md">
            <div className="flex items-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <h1 className="text-2xl font-bold ml-4">Eventure</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-3">{title}</h2>
            <p className="text-lg text-white/80 mb-6">{subtitle}</p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Connect with your campus community</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Discover amazing events and activities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Build meaningful relationships</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      {/* Right side - Form - Scrollable */}
      <div className="flex-1 bg-background h-screen lg:h-full overflow-y-auto scrollbar-hide">
        <div className="min-h-full flex items-center justify-center p-4 lg:p-6">
          <div className="w-full max-w-md lg:max-w-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
