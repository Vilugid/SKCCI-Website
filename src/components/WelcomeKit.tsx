import React from 'react';
import { MapPin, Users, Calendar, Facebook, BookOpen, Heart } from 'lucide-react';
import { TabItem } from '../types';

interface WelcomeKitProps {
  handleTabClick?: (tab: TabItem) => void;
}

export default function WelcomeKit({ handleTabClick }: WelcomeKitProps) {
  return (
    <div className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center">
          <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-serif">
            Welcome Kit
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Discover how you can get plugged into our church family and grow in your faith journey.
          </p>
        </div>

        {/* Feature Tiles */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Tile 1: The Gospel */}
          <div className="bg-amber-50 rounded-3xl p-8 sm:p-10 border border-amber-100 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-100 text-amber-600 mb-6">
              <Heart className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">The Gospel</h3>
            <p className="text-base text-gray-700 flex-grow mb-8 leading-relaxed">
              Experience the good news of Jesus Christ. Learn about His love, grace, and the salvation freely offered to everyone. This is the foundation of our faith.
            </p>
            <button 
              onClick={() => handleTabClick && handleTabClick('Gospel')}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-[#C82323] hover:bg-[#a11b1b] transition-colors w-full sm:w-auto shadow-sm"
            >
              Read The Gospel
            </button>
          </div>

          {/* Tile 2: 100 Days Bible Plan */}
          <div className="bg-blue-50 rounded-3xl p-8 sm:p-10 border border-blue-100 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 mb-6">
              <BookOpen className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">100 Days Bible Plan</h3>
            <p className="text-base text-gray-700 flex-grow mb-8 leading-relaxed">
              Start a daily journey through God's Word. This carefully curated 100-day reading plan will help you build a strong foundation and a lasting habit of reading the Bible.
            </p>
            <button 
              onClick={() => handleTabClick && handleTabClick('100 Days Bible Plan')}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto shadow-sm"
            >
              Start Bible Plan
            </button>
          </div>
        </div>

        {/* Connect With Us Section Divider */}
        <div className="mt-24 mb-16 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 bg-white text-2xl font-bold text-gray-900 font-serif">Connect With Us</span>
            </div>
          </div>
        </div>

        {/* Connection Options */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          
          {/* Service & Groups */}
          <div className="space-y-12">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[#FAFAFA] text-gray-600 border border-gray-100 shadow-sm">
                  <Calendar className="h-7 w-7" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-medium text-gray-900">Thru Sunday Service</h3>
                <p className="mt-2 text-base text-gray-600 leading-relaxed">
                  Weekly church gathering focused on the Word of God and Christian Fellowship. Join us every Sunday at 9:30 AM for a time of worship, learning, and connection.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[#FAFAFA] text-gray-600 border border-gray-100 shadow-sm">
                  <Users className="h-7 w-7" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-medium text-gray-900">Thru Cell Groups</h3>
                <p className="mt-2 text-base text-gray-600 leading-relaxed">
                  Small groups meeting weekly for deeper fellowship, prayer, and studying the Word together in a more intimate setting. Schedule is determined by your Cell Leader.
                </p>
              </div>
            </div>
          </div>

          {/* Location & Social */}
          <div className="bg-[#FAFAFA] rounded-3xl p-8 sm:p-10 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Location & Online</h3>
            
            <div className="flex items-start mb-8">
              <MapPin className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">SKCCI Worship Center</p>
                <p className="mt-1 text-base text-gray-600 leading-relaxed">
                  2nd Floor 158 Mañalac Avenue<br />
                  Bagong Tanyag, Taguig City<br />
                  <span className="text-sm text-gray-500">(Above Palawan Pawnshop)</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a 
                href="https://www.facebook.com/share/g/1BpFgffo67/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:w-1/2 px-4 py-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#C82323] hover:bg-[#a11b1b] transition-colors shadow-sm"
              >
                <Facebook className="mr-2 h-5 w-5" />
                Watch Live
              </a>
              <a 
                href="https://www.facebook.com/SaviorKingCC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:w-1/2 px-4 py-4 border-2 border-[#0F2C59] text-sm font-medium rounded-xl text-[#0F2C59] bg-white hover:bg-[#FAFAFA] transition-colors shadow-sm"
              >
                <Facebook className="mr-2 h-5 w-5" />
                Connect with Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
