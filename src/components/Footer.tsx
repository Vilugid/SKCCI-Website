import React from 'react';
import { TabItem } from '../types';

interface FooterProps {
  handleTabClick: (tab: TabItem) => void;
}

export default function Footer({ handleTabClick }: FooterProps) {
  return (
    <footer className="bg-[#0F2C59] pt-16 pb-8 border-t border-[#0a1e3f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/logos/churchlogo2.png" 
              alt="Savior-King Commission Church" onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              className="h-16 w-auto object-contain mb-6 filter brightness-0 invert" 
            />
            <p className="text-gray-300 max-w-md text-base leading-relaxed mb-6">
              Your Church Your Family. We exist to know God and make Him known, building a community transformed by His grace.
            </p>
            <p className="text-gray-400 text-sm">
              2nd Floor 158 Mañalac Avenue, Bagong Tanyag, Taguig City
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Welcome Kit', 'Gospel', 'Manuals', '100 Days Bible Plan', '365 Bible Reading Guide', 'Giving'].map((tab) => (
                <li key={tab}>
                  <button 
                    onClick={() => handleTabClick(tab as TabItem)}
                    className="text-base text-gray-400 hover:text-[#D4A373] transition-colors"
                  >
                    {tab === '365 Bible Reading Guide' ? '365-Day Guide' : tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SAVIOR-KING Commission Church International. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/SaviorKingCC" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-400">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
