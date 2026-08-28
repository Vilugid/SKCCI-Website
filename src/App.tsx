/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WelcomeKit from './components/WelcomeKit';
import Gospel from './components/Gospel';
import BiblePlan from './components/BiblePlan';
import BiblePlan365 from './components/BiblePlan365';
import Giving from './components/Giving';
import Ministries from './components/Ministries';
import Footer from './components/Footer';
import LockModal from './components/LockModal';
import ManualsReader from './components/ManualsReader';
import CellGroup from './components/CellGroup';
import LeaderTools from './components/LeaderTools';
import Events from './components/Events';
import PrayerHub from './components/PrayerHub';
import HannahChat from './components/HannahChat';
import { TabItem } from './types';
import { useSyncedState } from './hooks/useSyncedState';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabItem>('Home');
  const [showLockModal, setShowLockModal] = useState(false);
  const { loading } = useAuth();
  
  // Use synced state for progress
  const [progressArray, setProgressArray] = useSyncedState<number[]>('sk_100_day_progress', []);
  const [is100DayComplete, setIs100DayComplete] = useSyncedState<boolean>('sk_100_day_completed', false);

  const progressCount = progressArray.length;

  useEffect(() => {
    // Migration from old key if new key is empty
    if (progressArray.length === 0) {
      const oldSaved = localStorage.getItem('skcci_bible_plan');
      if (oldSaved) {
        try { 
          const parsed = JSON.parse(oldSaved);
          setProgressArray(parsed);
          if (parsed.length === 100) {
            setIs100DayComplete(true);
          }
        } catch(e) {}
      }
    } else if (progressArray.length === 100 && !is100DayComplete) {
      setIs100DayComplete(true);
    }
  }, [progressArray.length, is100DayComplete, setProgressArray, setIs100DayComplete]);

  const handleTabClick = (tab: TabItem) => {
    if (tab === '365 Bible Reading Guide' && !is100DayComplete) {
      setShowLockModal(true);
      return;
    }
    setActiveTab(tab);
  };

  // Simple scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C82323]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full">
      <Toaster position="bottom-right" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff' } }} />
      <Header 
        activeTab={activeTab} 
        handleTabClick={handleTabClick} 
        is100DayComplete={is100DayComplete} 
      />
      
      <main className="flex-grow w-full overflow-x-hidden">
        {activeTab === 'Home' && (
          <>
            <Hero handleTabClick={handleTabClick} />
            <WelcomeKit handleTabClick={handleTabClick} />
            <Ministries handleTabClick={handleTabClick} />
          </>
        )}
        
        {activeTab === 'Welcome Kit' && (
          <WelcomeKit handleTabClick={handleTabClick} />
        )}

        {activeTab === 'Gospel' && (
          <Gospel />
        )}

        {activeTab === 'Manuals' && (
          <ManualsReader />
        )}

        {activeTab === 'Cell Group' && (
          <CellGroup />
        )}

        {activeTab === 'Leader Tools' && (
          <LeaderTools />
        )}

        {activeTab === 'Events' && (
          <Events />
        )}

        {activeTab === 'Prayer Hub' && (
          <PrayerHub />
        )}

        {activeTab === '100 Days Bible Plan' && (
          <BiblePlan 
            progressArray={progressArray}
            setProgressArray={setProgressArray}
            is100DayComplete={is100DayComplete}
            setIs100DayComplete={setIs100DayComplete}
          />
        )}

        {activeTab === '365 Bible Reading Guide' && (
          <BiblePlan365 is100DayComplete={is100DayComplete} />
        )}

        {activeTab === 'Giving' && (
          <Giving />
        )}

        {activeTab === 'Contact' && (
          <div className="py-24 bg-[#FAFAFA] flex items-center justify-center min-h-[60vh]">
            <div className="text-center w-full max-w-4xl px-4">
              <h2 className="text-3xl font-extrabold text-gray-900 font-serif mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-8 text-lg">We would love to hear from you.</p>
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-left max-w-2xl mx-auto hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <p className="font-medium text-gray-900 mb-2">Address:</p>
                  <p className="text-gray-600">2nd Floor 158 Mañalac Avenue<br/>Bagong Tanyag, Taguig City</p>
                  <a 
                    href="https://maps.app.goo.gl/LTpu78MuorJqNexA8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-[#C82323] hover:text-[#a11b1b] mt-2 transition-colors"
                  >
                    <MapPin size={16} className="mr-1" />
                    Open in Google Maps
                  </a>
                </div>

                <div className="w-full h-64 mb-8 rounded-lg overflow-hidden border-0">
                  <iframe 
                    src="https://maps.google.com/maps?q=158+Manalac+Avenue,+Bagong+Tanyag,+Taguig+City&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                    className="w-full h-64 rounded-lg border-0"
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Savior-King Commission Church Location"
                  ></iframe>
                </div>
                
                <p className="font-medium text-gray-900 mb-4">Connect online:</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://www.facebook.com/share/g/1BpFgffo67/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-[#C82323] hover:bg-[#a11b1b] transition-colors shadow-sm flex-1"
                  >
                    Watch Live or Recording
                  </a>
                  <a 
                    href="https://www.facebook.com/SaviorKingCC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#0F2C59] text-sm font-medium rounded-xl text-[#0F2C59] bg-white hover:bg-[#FAFAFA] transition-colors shadow-sm flex-1"
                  >
                    Connect with Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer handleTabClick={handleTabClick} />

      {/* Floating Docked Virtual Church Usher */}
      <HannahChat handleTabClick={handleTabClick} />

      <LockModal 
        isOpen={showLockModal} 
        onClose={() => setShowLockModal(false)}
        onContinue={() => {
          setShowLockModal(false);
          handleTabClick('100 Days Bible Plan');
        }}
        progressCount={progressCount}
      />
    </div>
  );
}
