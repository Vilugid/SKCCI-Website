import React, { useState } from 'react';
import { Menu, X, User, Lock, ChevronDown, LogOut } from 'lucide-react';
import { TabItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  activeTab: TabItem;
  handleTabClick: (tab: TabItem) => void;
  is100DayComplete: boolean;
}

export default function Header({ activeTab, handleTabClick, is100DayComplete }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();
  const { dict } = useLanguage();

  const getTabClass = (tab: TabItem, isDropdownItem = false) => {
    if (isDropdownItem) {
      return `px-4 py-2.5 text-left text-sm font-medium transition-colors ${activeTab === tab ? 'bg-[#FAFAFA] text-[#C82323] font-semibold' : 'text-[#0F2C59] hover:bg-[#FAFAFA] hover:text-[#C82323]'}`;
    }
    
    // Top-level tabs
    const isActive = activeTab === tab || (tab === 'Welcome Kit' && (activeTab === 'Gospel' || activeTab === '100 Days Bible Plan'));
    return `text-sm lg:text-base xl:text-[17px] font-medium transition-colors duration-200 flex items-center gap-1 whitespace-nowrap cursor-pointer ${
      isActive 
        ? 'text-[#C82323] font-semibold border-b-2 border-[#C82323] pb-1' 
        : 'text-[#0F2C59] hover:text-[#C82323] pb-1'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs w-full">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 gap-3 lg:gap-6">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => handleTabClick('Home')}
          >
            <img 
              src="/churchlogo2.png" 
              alt="Savior-King Commission Church Logo" 
              className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain transition-transform hover:scale-[1.02]"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-2 lg:gap-3 xl:gap-5 mx-1 lg:mx-2">
            <button onClick={() => handleTabClick('Home')} className={getTabClass('Home')}>
              {dict.nav.home}
            </button>
            
            {/* Welcome Kit Dropdown */}
            <div className="relative group flex items-center">
              <button 
                onClick={() => handleTabClick('Welcome Kit')} 
                className={getTabClass('Welcome Kit')}
              >
                {dict.nav.welcomeKit}
                <ChevronDown size={14} className="text-[#0F2C59] group-hover:text-[#C82323] transition-colors" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="py-2 flex flex-col">
                  <button 
                    onClick={() => handleTabClick('Gospel')} 
                    className={getTabClass('Gospel', true)}
                  >
                    {dict.nav.gospel}
                  </button>
                  <button 
                    onClick={() => handleTabClick('100 Days Bible Plan')} 
                    className={getTabClass('100 Days Bible Plan', true)}
                  >
                    {dict.nav.biblePlan100}
                  </button>
                </div>
              </div>
            </div>

            {/* Grow Dropdown */}
            <div className="relative group flex items-center">
              <button 
                className={`text-sm lg:text-base xl:text-[17px] font-medium transition-colors duration-200 flex items-center gap-1 whitespace-nowrap cursor-pointer ${(activeTab === 'Manuals' || activeTab === '365 Bible Reading Guide' || activeTab === 'Cell Group' || activeTab === 'Leader Tools') ? 'text-[#C82323] font-semibold border-b-2 border-[#C82323] pb-1' : 'text-[#0F2C59] hover:text-[#C82323] pb-1'}`}
              >
                {dict.nav.grow}
                <ChevronDown size={14} className="text-[#0F2C59] group-hover:text-[#C82323] transition-colors" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="py-2 flex flex-col">
                  <button 
                    onClick={() => handleTabClick('Manuals')} 
                    className={getTabClass('Manuals', true)}
                  >
                    {dict.nav.manuals}
                  </button>
                  <button 
                    onClick={() => handleTabClick('365 Bible Reading Guide')} 
                    className={`${getTabClass('365 Bible Reading Guide', true)} flex items-center gap-2`}
                  >
                    {is100DayComplete 
                      ? <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-100 text-green-700 font-bold">{dict.nav.unlocked}</span>
                      : <Lock size={14} className="text-gray-400" />
                    }
                    {dict.nav.biblePlan365}
                  </button>
                  <button 
                    onClick={() => handleTabClick('Cell Group')} 
                    className={getTabClass('Cell Group', true)}
                  >
                    {dict.nav.cellGroup}
                  </button>
                  <button 
                    onClick={() => handleTabClick('Leader Tools')} 
                    className={getTabClass('Leader Tools', true)}
                  >
                    {dict.nav.leaderTools}
                  </button>
                </div>
              </div>
            </div>
            
            <button onClick={() => handleTabClick('Events')} className={getTabClass('Events')}>
              {dict.nav.events}
            </button>
            
            <button onClick={() => handleTabClick('Prayer Hub')} className={getTabClass('Prayer Hub')}>
              {dict.nav.prayerHub}
            </button>
            
            <button onClick={() => handleTabClick('Giving')} className={getTabClass('Giving')}>
              {dict.nav.giving}
            </button>
            
            <button onClick={() => handleTabClick('Contact')} className={getTabClass('Contact')}>
              {dict.nav.contact}
            </button>
          </nav>

          {/* Right Section: Language Switcher, Profile & Sign In, Mobile Menu Toggle */}
          <div className="flex items-center flex-shrink-0 gap-2 sm:gap-2.5 lg:gap-3 pl-1">
            <LanguageToggle theme="light" id="header-lang-toggle" />

            {/* Account Status / Sign In Button - ALWAYS visible on all screen sizes */}
            {user ? (
              <div 
                id="header-user-profile-badge"
                className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 border border-gray-200/80 py-1 px-1.5 sm:px-2.5 rounded-full shadow-2xs"
              >
                <div className="flex items-center gap-1.5">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-1 ring-gray-200 object-cover flex-shrink-0" 
                    />
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#0F2C59] border border-gray-200 flex-shrink-0">
                      <User size={15} />
                    </div>
                  )}
                  <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap max-w-[80px] lg:max-w-[120px] truncate">
                    {user.displayName?.split(' ')[0] || 'Member'}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                  title={dict.nav.signOut}
                  aria-label={dict.nav.signOut}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button 
                id="header-sign-in-btn"
                onClick={signInWithGoogle}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-bold rounded-full text-white bg-[#C82323] hover:bg-[#a11b1b] shadow-2xs transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                {dict.nav.signIn}
              </button>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <div className="pb-3 border-b border-gray-100 mb-2 flex justify-center">
              <LanguageToggle theme="light" id="mobile-drawer-lang-toggle" />
            </div>

            <button
              onClick={() => { handleTabClick('Home'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Home' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              {dict.nav.home}
            </button>
            
            <div className="py-2">
              <button
                onClick={() => { handleTabClick('Welcome Kit'); setIsMobileMenuOpen(false); }}
                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-medium ${(activeTab === 'Welcome Kit' || activeTab === 'Gospel' || activeTab === '100 Days Bible Plan') ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
              >
                {dict.nav.welcomeKit}
              </button>
              
              <div className="pl-6 pr-4 py-2 space-y-1 border-l-2 border-gray-100 ml-6 mt-1">
                <button
                  onClick={() => { handleTabClick('Gospel'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Gospel' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  {dict.nav.gospel}
                </button>
                <button
                  onClick={() => { handleTabClick('100 Days Bible Plan'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === '100 Days Bible Plan' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  {dict.nav.biblePlan100}
                </button>
              </div>
            </div>

            <div className="py-2">
              <div
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium ${(activeTab === 'Manuals' || activeTab === '365 Bible Reading Guide' || activeTab === 'Cell Group' || activeTab === 'Leader Tools') ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59]'}`}
              >
                {dict.nav.grow}
              </div>
              
              <div className="pl-6 pr-4 py-2 space-y-1 border-l-2 border-gray-100 ml-6 mt-1">
                <button
                  onClick={() => { handleTabClick('Manuals'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Manuals' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  {dict.nav.manuals}
                </button>
                <button
                  onClick={() => { handleTabClick('365 Bible Reading Guide'); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === '365 Bible Reading Guide' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  {is100DayComplete 
                    ? <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-100 text-green-700 font-bold">{dict.nav.unlocked}</span>
                    : <Lock size={14} className="text-gray-400" />
                  }
                  {dict.nav.biblePlan365}
                </button>
                <button
                  onClick={() => { handleTabClick('Cell Group'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Cell Group' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  {dict.nav.cellGroup}
                </button>
                <button
                  onClick={() => { handleTabClick('Leader Tools'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Leader Tools' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  {dict.nav.leaderTools}
                </button>
              </div>
            </div>

            <button
              onClick={() => { handleTabClick('Events'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Events' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              {dict.nav.events}
            </button>

            <button
              onClick={() => { handleTabClick('Prayer Hub'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Prayer Hub' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              {dict.nav.prayerHub}
            </button>

            <button
              onClick={() => { handleTabClick('Giving'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Giving' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              {dict.nav.giving}
            </button>
            
            <button
              onClick={() => { handleTabClick('Contact'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Contact' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              {dict.nav.contact}
            </button>

            <div className="pt-6 pb-2 border-t border-gray-100 mt-6">
              {user ? (
                <div className="flex items-center justify-between px-4 py-2 bg-[#FAFAFA] rounded-xl">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0F2C59] border border-gray-200">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <div className="text-base font-medium text-gray-800">{user.displayName}</div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={logout} className="p-2 text-gray-400 hover:text-gray-600">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[#C82323] hover:bg-[#a11b1b]"
                >
                  {dict.nav.signIn}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
