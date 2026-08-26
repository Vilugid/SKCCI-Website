import React from 'react';
import { ArrowRight, MapPin, Clock, Heart, Users, Sparkles, Tv, BookOpen } from 'lucide-react';
import { TabItem } from '../types';

interface HeroProps {
  handleTabClick: (tab: TabItem) => void;
}

export default function Hero({ handleTabClick }: HeroProps) {
  return (
    <div className="relative bg-[#FAFAFA] overflow-hidden border-b border-gray-100">
      <div className="relative pb-16 sm:pb-24 lg:pb-28">
        <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Left Column: Intro */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center">
              <div>
                <span className="block text-sm font-semibold uppercase tracking-wide text-[#C82323] sm:text-base lg:text-sm xl:text-base mb-2">
                  WELCOME HOME
                </span>
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl text-[#0F2C59] font-serif leading-[1.1]">
                  Your Church
                  <br />
                  <span className="text-[#D4A373]">Your Family</span>
                </h1>
              </div>

              <p className="mt-5 text-base text-gray-600 sm:text-lg leading-relaxed">
                Experience the love, community, and transformative power of God with us. We are SAVIOR-KING Commission Church International.
              </p>
              
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#D4A373]/40 bg-[#D4A373]/10 text-[#0F2C59] text-sm font-medium mb-8 shadow-2xs">
                  <Clock size={16} className="mr-2 text-[#C82323]" />
                  Sunday Service: Every Sunday @ 9:30 AM
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => handleTabClick('Contact')}
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-md text-white bg-[#C82323] hover:bg-[#a11b1b] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    Plan Your Visit
                  </button>
                  <button 
                    onClick={() => handleTabClick('Cell Group')}
                    className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#0F2C59] text-base font-semibold rounded-full text-[#0F2C59] bg-white hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-xs"
                  >
                    Connect to Cell
                    <ArrowRight size={18} className="ml-2 flex-shrink-0" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column: Original Church Collage Photo linking to Facebook */}
            <div className="mt-12 relative sm:max-w-xl sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 flex justify-center">
              <a
                href="https://www.facebook.com/SaviorKingCC"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl group border-4 border-white"
                title="Visit Savior-King Commission Church on Facebook"
              >
                <img
                  src="/savior-king.png"
                  alt="SAVIOR-KING Commission Church - Your Church, Your Family"
                  className="w-full h-auto object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <span className="text-white text-sm font-semibold bg-[#0F2C59]/90 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Visit our Facebook Page
                  </span>
                </div>
              </a>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
