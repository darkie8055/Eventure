"use client"

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  // Dynamic content based on the page type
  const isLogin = title === "Welcome Back!";
  const isSignup = title === "Join Eventure";
  
  const getContent = () => {
    if (isLogin) {
      return {
        headline: "Welcome Back!",
        description: "Continue your journey in the campus community",
        features: [
          "Connect with your campus community",
          "Discover amazing events and activities", 
          "Build meaningful relationships"
        ],
        gradientFrom: "from-purple-600",
        gradientVia: "via-purple-500",
        gradientTo: "to-indigo-600"
      };
    } else if (isSignup) {
      return {
        headline: "Join the Community",
        description: "Start your amazing campus journey today",
        features: [
          "Create your student or community lead profile",
          "Access exclusive campus events and opportunities",
          "Network with peers and build lasting connections"
        ],
        gradientFrom: "from-indigo-600",
        gradientVia: "via-purple-500", 
        gradientTo: "to-purple-600"
      };
    } else {
      return {
        headline: title,
        description: subtitle,
        features: [
          "Connect with your campus community",
          "Discover amazing events and activities",
          "Build meaningful relationships"
        ],
        gradientFrom: "from-purple-600",
        gradientVia: "via-purple-500",
        gradientTo: "to-indigo-600"
      };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left side - Dynamic Modern Purple Gradient Hero */}
      <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br ${content.gradientFrom} ${content.gradientVia} ${content.gradientTo} relative overflow-hidden min-h-screen`}>
        {/* Glassmorphism floating elements with animations */}
        <div className="absolute top-16 left-12 w-40 h-40 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-16 w-32 h-32 bg-white/15 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl rotate-12 animate-float-rotate"></div>
        <div className="absolute bottom-24 left-20 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg animate-float-gentle"></div>
        <div className="absolute bottom-1/3 right-8 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 shadow-md rotate-45 animate-float"></div>
        
        {/* Dynamic floating elements based on page type */}
        {isLogin && (
          <>
            <div className="absolute top-20 right-24 w-28 h-28 bg-gradient-to-br from-pink-400/30 to-purple-400/20 rounded-full blur-xl animate-pulse animate-float"></div>
            <div className="absolute bottom-32 left-16 w-36 h-36 bg-gradient-to-br from-indigo-400/25 to-purple-500/15 rounded-full blur-2xl animate-float-slow"></div>
          </>
        )}
        
        {isSignup && (
          <>
            <div className="absolute top-24 right-20 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-purple-400/20 rounded-full blur-xl animate-pulse animate-float-gentle"></div>
            <div className="absolute bottom-28 left-12 w-40 h-40 bg-gradient-to-br from-purple-400/25 to-indigo-500/15 rounded-full blur-2xl animate-float-slow"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/15 rounded-full blur-lg animate-float"></div>
          </>
        )}
        
        {/* Soft gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-800/30 via-transparent to-purple-400/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        {/* Subtle campus/community icons - minimal abstract shapes with floating animation */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/20 rounded border border-white/30 rotate-45 animate-float-gentle"></div>
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-white/15 rounded-full animate-float"></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-white/20 rounded border border-white/25 rotate-12 animate-float-slow"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white h-full min-h-screen">
          <div className="max-w-lg space-y-8">
            {/* Logo section with enhanced glassmorphism */}
            <div className="flex items-center space-x-4 mb-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-heading">Eventure</h1>
                <p className="text-sm text-white/80 font-display">Campus Community Platform</p>
              </div>
            </div>
            
            {/* Main headline */}
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-white leading-tight tracking-tight font-heading">
                {content.headline}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed max-w-md font-display font-medium">
                {content.description}
              </p>
            </div>
            
            {/* Dynamic feature bullets with modern styling */}
            <div className="space-y-5 mt-12">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-lg text-white/95 group-hover:text-white transition-colors duration-200 font-display font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Bottom accent element */}
            <div className="pt-8">
              <div className="w-20 h-1 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>
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
