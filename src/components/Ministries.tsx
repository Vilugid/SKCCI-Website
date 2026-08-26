import React from 'react';
import { Users, Baby, GraduationCap, Network } from 'lucide-react';

import { TabItem } from '../types';

const ministries = [
  {
    name: 'Kids Ministry',
    description: 'Nurturing the next generation with the love and truth of God in a fun, safe environment.',
    icon: Baby,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    name: 'Youth Ministry',
    description: 'Empowering young people to live boldly for Christ and build strong, faith-based friendships.',
    icon: GraduationCap,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Young Professionals',
    description: 'Navigating career, life, and faith together as young adults in the workplace.',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Cell Groups',
    description: 'Intimate small groups for weekly Bible study, prayer, and doing life together.',
    icon: Network,
    color: 'bg-amber-100 text-amber-600',
  },
];

export default function Ministries({ handleTabClick }: { handleTabClick?: (tab: TabItem) => void }) {
  return (
    <div className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-amber-600 tracking-wide uppercase">Get Involved</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-serif">
            Our Primary Ministries
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            There is a place for everyone to grow, serve, and belong in our church family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ministries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <div 
                key={ministry.name} 
                className={`bg-[#FAFAFA] rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300 ${ministry.name === 'Cell Groups' && handleTabClick ? 'cursor-pointer hover:border-amber-200' : ''}`}
                onClick={() => {
                  if (ministry.name === 'Cell Groups' && handleTabClick) {
                    handleTabClick('Cell Group');
                  }
                }}
              >
                <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl ${ministry.color} mb-6`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ministry.name}</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {ministry.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
