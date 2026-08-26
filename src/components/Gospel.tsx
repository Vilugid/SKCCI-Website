import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GOSPEL_CARDS } from '../data';
import { BookOpen } from 'lucide-react';

export default function Gospel() {
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setRevealedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="py-16 bg-[#FAFAFA] sm:py-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 mb-6">
            <BookOpen size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
            The Gospel
          </h2>
          <div className="mt-8 relative max-w-3xl mx-auto">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#FAFAFA] px-4 text-sm text-gray-500 uppercase tracking-widest">
                Romans 6:23 NIV
              </span>
            </div>
          </div>
          <p className="mt-8 text-2xl sm:text-3xl font-medium text-gray-800 leading-relaxed font-serif max-w-4xl mx-auto">
            "For the <span className="text-red-600">wages</span> of <span className="text-red-600">sin</span> is <span className="text-red-600">death</span>, 
            <span className="text-amber-600 font-bold mx-2">BUT</span> 
            the <span className="text-green-600">gift</span> of <span className="text-green-600">God</span> is <span className="text-green-600">eternal life</span> in <span className="text-green-600">Christ Jesus</span> our <span className="text-blue-600">Lord</span>."
          </p>
          <p className="mt-4 text-gray-500 text-sm">Tap each card below to explore its meaning.</p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto flex flex-col items-center mb-12">
          <div className="w-full relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <iframe 
              src="https://docs.google.com/presentation/d/1d2jd_E1Ec-SLw8L4hxZuQT921oNGXG_B-UqbST5fUdk/embed?start=false&loop=false&delayms=3000" 
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen={true}
              title="The Gospel Presentation"
            />
          </div>
          <div className="mt-6 flex justify-center w-full">
            <a 
              href="https://docs.google.com/presentation/d/1d2jd_E1Ec-SLw8L4hxZuQT921oNGXG_B-UqbST5fUdk/view" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-[#FAFAFA] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              View Presentation Fullscreen
            </a>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOSPEL_CARDS.map((card) => {
            const isRevealed = revealedCards.has(card.id);
            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => toggleCard(card.id)}
                className={`relative rounded-2xl p-6 cursor-pointer overflow-hidden transition-shadow duration-300 ${
                  isRevealed ? 'bg-white shadow-md ring-1 ring-amber-200' : 'bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-amber-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col h-full justify-center min-h-[120px]">
                  <h3 className={`text-xl font-bold text-center ${isRevealed ? 'text-amber-700 mb-4' : 'text-gray-800'}`}>
                    {card.word}
                  </h3>
                  
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-600 text-center text-sm leading-relaxed">
                          {card.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
