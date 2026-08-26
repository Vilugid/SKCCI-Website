import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { TabItem } from '../types';

interface HeroProps {
  handleTabClick: (tab: TabItem) => void;
}

export default function Hero({ handleTabClick }: HeroProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Decorative background pattern */}
      <div className="hidden lg:block lg:absolute lg:inset-0" aria-hidden="true">
        <svg className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8" width="640" height="784" fill="none" viewBox="0 0 640 784">
          <defs>
            <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-gray-100" fill="currentColor" />
            </pattern>
          </defs>
          <rect y="72" width="640" height="640" className="text-gray-50" fill="currentColor" />
          <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
        </svg>
      </div>

      <div className="relative pb-16 sm:pb-24 lg:pb-32">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-[#C82323] sm:text-base lg:text-sm xl:text-base">
                  Welcome Home
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl text-[#0F2C59] font-serif">
                  Your Church
                  <br />
                  <span className="text-[#D4A373]">Your Family</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Experience the love, community, and transformative power of God with us. We are SAVIOR-KING Commission Church International.
              </p>
              
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#D4A373]/30 bg-[#D4A373]/10 text-[#0F2C59] text-sm font-medium mb-8">
                  <Clock size={16} className="mr-2 text-[#C82323]" />
                  Sunday Service: Every Sunday @ 9:30 AM
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => handleTabClick('Contact')}
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#C82323] hover:bg-[#a11b1b] transition-colors whitespace-nowrap"
                  >
                    Plan Your Visit
                  </button>
                  <button 
                    onClick={() => handleTabClick('Cell Group')}
                    className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#0F2C59] text-base font-medium rounded-full text-[#0F2C59] bg-white hover:bg-[#FAFAFA] transition-colors whitespace-nowrap"
                  >
                    Connect to Cell
                    <ArrowRight size={18} className="ml-2 flex-shrink-0" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full lg:max-w-xl xl:max-w-2xl rounded-2xl shadow-xl overflow-hidden bg-gray-100 group transition-transform hover:scale-[1.02]">
                <a 
                  href="https://www.facebook.com/SaviorKingCC" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img 
                    src="/savior-king.png" 
                    alt="Savior-King Commission Church Worship Banner" 
                    className="w-full h-auto rounded-lg"
                  />
                  {/* Inner shadow/overlay */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none"></div>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
