import React, { useState } from 'react';
import { Menu, X, User, Lock, ChevronDown, LogOut } from 'lucide-react';
import { TabItem } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeTab: TabItem;
  handleTabClick: (tab: TabItem) => void;
  is100DayComplete: boolean;
}

const TABS: TabItem[] = ['Home', 'Welcome Kit', 'Gospel', 'Manuals', '100 Days Bible Plan', '365 Bible Reading Guide', 'Cell Group', 'Leader Tools', 'Events', 'Prayer Hub', 'Giving', 'Contact'];

export default function Header({ activeTab, handleTabClick, is100DayComplete }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  const getTabClass = (tab: TabItem, isDropdownItem = false) => {
    if (isDropdownItem) {
      return `px-4 py-2.5 text-left text-sm font-medium transition-colors ${activeTab === tab ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:bg-[#FAFAFA] hover:text-[#C82323]'}`;
    }
    
    // Top-level tabs
    const isActive = activeTab === tab || (tab === 'Welcome Kit' && (activeTab === 'Gospel' || activeTab === '100 Days Bible Plan'));
    return `text-2xl font-medium transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap ${
      isActive 
        ? 'text-[#C82323] border-b-2 border-[#C82323] pb-1' 
        : 'text-[#0F2C59] hover:text-[#C82323] pb-1'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-end gap-4 lg:gap-8">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-end cursor-pointer"
            onClick={() => handleTabClick('Home')}
          >
            <img 
              src="/churchlogo2.png" 
              alt="Savior-King Commission Church Logo" 
              className="h-20 lg:h-24 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center items-end space-x-4 lg:space-x-8">
            <button onClick={() => handleTabClick('Home')} className={getTabClass('Home')}>
              Home
            </button>
            
            {/* Welcome Kit Dropdown */}
            <div className="relative group flex items-end">
              <button 
                onClick={() => handleTabClick('Welcome Kit')} 
                className={getTabClass('Welcome Kit')}
              >
                Welcome Kit
                <ChevronDown size={14} className="text-[#0F2C59] group-hover:text-[#C82323] transition-colors" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="py-2 flex flex-col">
                  <button 
                    onClick={() => handleTabClick('Gospel')} 
                    className={getTabClass('Gospel', true)}
                  >
                    Gospel
                  </button>
                  <button 
                    onClick={() => handleTabClick('100 Days Bible Plan')} 
                    className={getTabClass('100 Days Bible Plan', true)}
                  >
                    100 Days Bible Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Grow Dropdown */}
            <div className="relative group flex items-end">
              <button 
                className={`text-2xl font-medium transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap ${(activeTab === 'Manuals' || activeTab === '365 Bible Reading Guide' || activeTab === 'Cell Group' || activeTab === 'Leader Tools') ? 'text-[#C82323] border-b-2 border-[#C82323] pb-1' : 'text-[#0F2C59] hover:text-[#C82323] pb-1'}`}
              >
                Grow
                <ChevronDown size={14} className="text-[#0F2C59] group-hover:text-[#C82323] transition-colors" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="py-2 flex flex-col">
                  <button 
                    onClick={() => handleTabClick('Manuals')} 
                    className={getTabClass('Manuals', true)}
                  >
                    Manuals
                  </button>
                  <button 
                    onClick={() => handleTabClick('365 Bible Reading Guide')} 
                    className={`${getTabClass('365 Bible Reading Guide', true)} flex items-center gap-2`}
                  >
                    {is100DayComplete 
                      ? <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-100 text-green-700 font-bold">UNLOCKED!</span>
                      : <Lock size={14} className="text-gray-400" />
                    }
                    365-Day Guide
                  </button>
                  <button 
                    onClick={() => handleTabClick('Cell Group')} 
                    className={getTabClass('Cell Group', true)}
                  >
                    Cell Group
                  </button>
                  <button 
                    onClick={() => handleTabClick('Leader Tools')} 
                    className={getTabClass('Leader Tools', true)}
                  >
                    Leader Tools
                  </button>
                </div>
              </div>
            </div>
            
            <button onClick={() => handleTabClick('Events')} className={getTabClass('Events')}>
              Events
            </button>
            
            <button onClick={() => handleTabClick('Prayer Hub')} className={getTabClass('Prayer Hub')}>
              Prayer Hub
            </button>
            
            <button onClick={() => handleTabClick('Giving')} className={getTabClass('Giving')}>
              Giving
            </button>
            
            <button onClick={() => handleTabClick('Contact')} className={getTabClass('Contact')}>
              Contact
            </button>
          </nav>

          {/* Sign In Button / Profile */}
          <div className="hidden md:flex items-end flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-3 pb-1">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#0F2C59]">
                      <User size={16} />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap hidden lg:block">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-[#C82323] hover:bg-[#a11b1b] transition-colors whitespace-nowrap mb-1"
              >
                Sign in with Google
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-end flex-shrink-0 pb-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <button
              onClick={() => { handleTabClick('Home'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Home' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              Home
            </button>
            
            <div className="py-2">
              <button
                onClick={() => { handleTabClick('Welcome Kit'); setIsMobileMenuOpen(false); }}
                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-medium ${(activeTab === 'Welcome Kit' || activeTab === 'Gospel' || activeTab === '100 Days Bible Plan') ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
              >
                Welcome Kit
              </button>
              
              <div className="pl-6 pr-4 py-2 space-y-1 border-l-2 border-gray-100 ml-6 mt-1">
                <button
                  onClick={() => { handleTabClick('Gospel'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Gospel' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  Gospel
                </button>
                <button
                  onClick={() => { handleTabClick('100 Days Bible Plan'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === '100 Days Bible Plan' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  100 Days Bible Plan
                </button>
              </div>
            </div>

            <div className="py-2">
              <div
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium ${(activeTab === 'Manuals' || activeTab === '365 Bible Reading Guide' || activeTab === 'Cell Group' || activeTab === 'Leader Tools') ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59]'}`}
              >
                Grow
              </div>
              
              <div className="pl-6 pr-4 py-2 space-y-1 border-l-2 border-gray-100 ml-6 mt-1">
                <button
                  onClick={() => { handleTabClick('Manuals'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Manuals' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  Manuals
                </button>
                <button
                  onClick={() => { handleTabClick('365 Bible Reading Guide'); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === '365 Bible Reading Guide' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  {is100DayComplete 
                    ? <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-100 text-green-700 font-bold">UNLOCKED!</span>
                    : <Lock size={14} className="text-gray-400" />
                  }
                  365-Day Guide
                </button>
                <button
                  onClick={() => { handleTabClick('Cell Group'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Cell Group' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  Cell Group
                </button>
                <button
                  onClick={() => { handleTabClick('Leader Tools'); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'Leader Tools' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-gray-600 hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
                >
                  Leader Tools
                </button>
              </div>
            </div>

            <button
              onClick={() => { handleTabClick('Events'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Events' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              Events
            </button>

            <button
              onClick={() => { handleTabClick('Prayer Hub'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Prayer Hub' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              Prayer Hub
            </button>

            <button
              onClick={() => { handleTabClick('Giving'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Giving' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              Giving
            </button>
            
            <button
              onClick={() => { handleTabClick('Contact'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${activeTab === 'Contact' ? 'bg-[#FAFAFA] text-[#C82323]' : 'text-[#0F2C59] hover:text-[#C82323] hover:bg-[#FAFAFA]'}`}
            >
              Contact
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
                  Sign in with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
