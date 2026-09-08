import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GOSPEL_CARDS } from '../data';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const GOSPEL_CARD_TRANSLATIONS: Record<string, { en: { word: string; explanation: string }; fil: { word: string; explanation: string } }> = {
  wages: {
    en: { word: 'Wages', explanation: 'Something we earn or deserve' },
    fil: { word: 'Kabayaran (Wages)', explanation: 'Isang bagay na ating pinaghirapan, kinita, o nararapat sa atin' }
  },
  sin: {
    en: { word: 'Sin', explanation: 'The nature of human, not just sinful actions' },
    fil: { word: 'Kasalanan (Sin)', explanation: 'Ang likas na kalagayan ng tao, hindi lamang masasamang gawa' }
  },
  death: {
    en: { word: 'Death', explanation: 'In the Bible, it means separation' },
    fil: { word: 'Kamatayan (Death)', explanation: 'Sa Banal na Kasulatan, ito ay nangangahulugang pagkahiwalay sa Diyos' }
  },
  but: {
    en: { word: 'BUT', explanation: 'There is Hope' },
    fil: { word: 'NGUNIT (BUT)', explanation: 'Mayroong Pag-asa!' }
  },
  gift: {
    en: { word: 'Gift', explanation: 'Opposite of wages. Given freely out of love' },
    fil: { word: 'Kaloob (Gift)', explanation: 'Kabaligtaran ng kabayaran. Malayang ibinigay dahil sa dakilang pag-ibig' }
  },
  god: {
    en: { word: 'GOD', explanation: 'The only One who can give this Gift' },
    fil: { word: 'DIYOS (GOD)', explanation: 'Ang tanging May Akda at Makapagbibigay ng Kaloob na ito' }
  },
  eternal_life: {
    en: { word: 'Eternal Life', explanation: 'To be with God in heaven forever' },
    fil: { word: 'Buhay na Walang Hanggan', explanation: 'Makasama ang Diyos sa kalangitan magpakailanman' }
  },
  jesus_christ: {
    en: { word: 'JESUS CHRIST', explanation: 'The Son of God and the only One who can and is willing to pay for our sins' },
    fil: { word: 'CRISTO JESUS', explanation: 'Ang Anak ng Diyos at ang tanging may kakayahan at nagbayad para sa ating mga kasalanan' }
  },
  lord_confession: {
    en: { word: 'Lord by Confession', explanation: 'Proclaiming that we are sinners, we cannot save ourselves, and only JESUS can save us' },
    fil: { word: 'Panginoon sa Pagpapahayag', explanation: 'Paghahayag na tayo ay makasalanan, hindi natin kayang iligtas ang ating sarili, at si Hesus lamang ang tagapagligtas' }
  },
  lord_surrender: {
    en: { word: 'Lord by Surrender', explanation: 'Accepting JESUS as the primary authority in our lives' },
    fil: { word: 'Panginoon sa Pagsuko', explanation: 'Pagtanggap kay HESUS bilang pangunahing kapangyarihan at gabay sa ating buong buhay' }
  },
};

export default function Gospel() {
  const { dict, isTagalog } = useLanguage();
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
            {dict.gospel.title}
          </h2>
          <div className="mt-8 relative max-w-3xl mx-auto">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#FAFAFA] px-4 text-sm text-gray-500 uppercase tracking-widest">
                {dict.gospel.verseRef}
              </span>
            </div>
          </div>
          
          {isTagalog ? (
            <p className="mt-8 text-2xl sm:text-3xl font-medium text-gray-800 leading-relaxed font-serif max-w-4xl mx-auto">
              "Sapagkat ang <span className="text-red-600 font-bold">kabayaran</span> ng <span className="text-red-600 font-bold">kasalanan</span> ay <span className="text-red-600 font-bold">kamatayan</span>, 
              <span className="text-amber-600 font-bold mx-2">NGUNIT</span> 
              ang <span className="text-green-600 font-bold">kaloob</span> ng <span className="text-green-600 font-bold">Diyos</span> ay <span className="text-green-600 font-bold">buhay na walang hanggan</span> kay <span className="text-green-600 font-bold">Cristo Jesus</span> na ating <span className="text-blue-600 font-bold">Panginoon</span>."
            </p>
          ) : (
            <p className="mt-8 text-2xl sm:text-3xl font-medium text-gray-800 leading-relaxed font-serif max-w-4xl mx-auto">
              "For the <span className="text-red-600 font-bold">wages</span> of <span className="text-red-600 font-bold">sin</span> is <span className="text-red-600 font-bold">death</span>, 
              <span className="text-amber-600 font-bold mx-2">BUT</span> 
              the <span className="text-green-600 font-bold">gift</span> of <span className="text-green-600 font-bold">God</span> is <span className="text-green-600 font-bold">eternal life</span> in <span className="text-green-600 font-bold">Christ Jesus</span> our <span className="text-blue-600 font-bold">Lord</span>."
            </p>
          )}
          <p className="mt-4 text-gray-500 text-sm">{dict.gospel.instruction}</p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto flex flex-col items-center mb-12">
          <div className="w-full relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <iframe 
              src="https://docs.google.com/presentation/d/1d2jd_E1Ec-SLw8L4hxZuQT921oNGXG_B-UqbST5fUdk/embed?start=false&loop=false&delayms=3000" 
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen={true}
              title={dict.gospel.presentationTitle}
            />
          </div>
          <div className="mt-6 flex justify-center w-full">
            <a 
              href="https://docs.google.com/presentation/d/1d2jd_E1Ec-SLw8L4hxZuQT921oNGXG_B-UqbST5fUdk/view" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-[#FAFAFA] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-pointer"
            >
              {dict.gospel.openInNewTab}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOSPEL_CARDS.map((card) => {
            const isRevealed = revealedCards.has(card.id);
            const cardTrans = GOSPEL_CARD_TRANSLATIONS[card.id];
            const word = cardTrans ? (isTagalog ? cardTrans.fil.word : cardTrans.en.word) : card.word;
            const explanation = cardTrans ? (isTagalog ? cardTrans.fil.explanation : cardTrans.en.explanation) : card.explanation;

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
                    {word}
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
                          {explanation}
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
