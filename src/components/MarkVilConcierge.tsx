import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, Loader2, MessageSquare, History, MapPin, Calendar, Heart, Gift, Video, FileText, UserPlus, BookOpen } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { TabItem } from '../types';

export default function MarkVilConcierge({ handleTabClick }: { handleTabClick?: (tab: TabItem) => void }) {
  const { user, signInWithGoogle } = useAuth();
  const { language } = useLanguage();
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [pastConversations, setPastConversations] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (user && db) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const q = query(collection(db, `users/${user!.uid}/conversations`), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPastConversations(history);
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  const translations = {
    fil: {
      header: "Maligayang Pagdating sa SKCCI Website!",
      placeholder: "Tanungin ako ng kahit ano tungkol sa simbahan...",
      signInPrompt: "Mangyaring mag-sign in para makausap si Mark Vil, ang iyong AI Ministry Guide.",
      signInBtn: "Mag-Sign In gamit ang Google",
      historyBtn: "Aking Kasaysayan",
      chips: {
        visit: "Planuhin ang Pagbisita",
        cell: "Sumali sa Cell Group",
        gospel: "Ang Mabuting Balita",
        devo: "Gabay sa Debosyon",
        events: "Mga Kaganapan",
        prayer: "Ipadala ang Panalangin",
        give: "Paano Magkaloob",
        watch: "Manood Online",
        sermon: "Outline ng Mensahe",
        location: "Lokasyon ng Simbahan"
      },
      aiGreeting: "Kamusta! Ako si Mark Vil, ang inyong AI Ministry Concierge. Paano ko po kayo matutulungan ngayon?"
    },
    en: {
      header: "Welcome to the SKCCI Website!",
      placeholder: "Ask me anything about the church...",
      signInPrompt: "Please sign in to chat with Mark Vil, your AI Ministry Guide.",
      signInBtn: "Sign In with Google",
      historyBtn: "My History",
      chips: {
        visit: "Plan My Visit",
        cell: "Join a Cell Group",
        gospel: "The Gospel",
        devo: "Devotionals",
        events: "Upcoming Events",
        prayer: "Send Prayer Request",
        give: "How to Give",
        watch: "Watch Online",
        sermon: "Sermon Outline",
        location: "Church Location"
      },
      aiGreeting: "Hello! I am Mark Vil, your AI Ministry Concierge. How can I help you today?"
    }
  };

  const t = translations[language];

  const handleSend = async (text: string) => {
    if (!text.trim() || !user) return;
    
    const userMsg = { role: 'user' as const, content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
          language
        })
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      const aiMsg = { role: 'model' as const, content: data.reply };
      
      const updatedMessages = [...newMessages, aiMsg];
      setMessages(updatedMessages);

      // Save to Firestore safely
      if (db && user) {
        try {
          const sanitizedMessages = updatedMessages.map(m => ({
            role: m.role || 'user',
            content: m.content || ''
          }));
          await addDoc(collection(db, `users/${user.uid}/conversations`), {
            userId: user.uid,
            messages: sanitizedMessages,
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
          loadHistory();
        } catch (dbErr) {
          console.warn("Could not sync conversation to cloud Firestore:", dbErr);
        }
      }

    } catch (error) {
      console.error(error);
      const fallbackErrorMsg = language === 'fil'
        ? "Paumanhin po, nagkaroon ng pansamantalang aberya sa koneksyon. Mangyaring subukan muli o bisitahin ang aming mga tab para sa impormasyon."
        : "Sorry, there was a temporary connection issue. Please try again or check our ministry tabs for information.";
      
      const fallbackAiMsg = { role: 'model' as const, content: fallbackErrorMsg };
      setMessages([...newMessages, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const chips = [
    { label: t.chips.visit, icon: <MapPin size={16} /> },
    { label: t.chips.cell, icon: <UserPlus size={16} /> },
    { label: t.chips.gospel, icon: <Heart size={16} /> },
    { label: t.chips.devo, icon: <BookOpen size={16} /> },
    { label: t.chips.events, icon: <Calendar size={16} /> },
    { label: t.chips.prayer, icon: <MessageSquare size={16} /> },
    { label: t.chips.give, icon: <Gift size={16} /> },
    { label: t.chips.watch, icon: <Video size={16} /> },
    { label: t.chips.sermon, icon: <FileText size={16} /> },
    { label: t.chips.location, icon: <MapPin size={16} /> },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-[700px] max-h-[85vh]">
      
      {/* Header */}
      <div className="bg-[#0F2C59] p-6 text-white flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold font-serif">{t.header}</h2>
          <p className="text-amber-100 text-sm mt-1 opacity-90">Powered by Mark Vil AI Ministry Guide</p>
        </div>
        {user && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-medium"
          >
            <History size={18} /> {t.historyBtn}
          </button>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* History Drawer */}
        {showHistory && user && (
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto hidden sm:block shrink-0">
            <h3 className="font-bold text-gray-700 mb-4 uppercase tracking-wider text-xs">Past Interactions</h3>
            <div className="space-y-3">
              {pastConversations.map((conv, i) => (
                <div key={conv.id || i} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-amber-300 transition-colors" onClick={() => setMessages(conv.messages)}>
                  <p className="text-xs text-gray-500 mb-1">{new Date(conv.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-800 line-clamp-2">{conv.messages[0]?.content}</p>
                </div>
              ))}
              {pastConversations.length === 0 && <p className="text-sm text-gray-500">No history yet.</p>}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#FAFAFA] relative">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Initial Greeting */}
            {messages.length === 0 && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 max-w-[85%] shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F2C59] flex items-center justify-center shrink-0">
                    <img src="/churchlogo2.png" className="w-6 h-6 object-contain filter brightness-0 invert" alt="AI" />
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg leading-relaxed">{t.aiGreeting}</p>
                    
                    {/* Action Chips */}
                    {user && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {chips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(chip.label)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors"
                          >
                            {chip.icon}
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl p-4 sm:p-5 max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-[#0F2C59] text-white rounded-br-none shadow-md' 
                    : 'bg-white border border-gray-100 rounded-bl-none shadow-sm'
                }`}>
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center">
                        <img src="/churchlogo2.png" className="w-4 h-4 object-contain filter brightness-0 invert" alt="AI" />
                      </div>
                      <span className="font-bold text-xs uppercase tracking-wider text-gray-500">Mark Vil Concierge</span>
                    </div>
                  )}
                  <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'text-white' : 'text-gray-800 prose-a:text-[#C82323]'}`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-5 shadow-sm flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center shrink-0">
                    <img src="/churchlogo2.png" className="w-4 h-4 object-contain filter brightness-0 invert" alt="AI" />
                  </div>
                  <Loader2 className="animate-spin text-gray-400" size={20} />
                  <span className="text-gray-500 text-sm">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            {user ? (
              <div className="flex gap-2 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-[#FAFAFA] border border-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C82323] focus:border-transparent text-gray-900 text-base"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="bg-[#C82323] hover:bg-[#a11b1b] text-white rounded-xl px-5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            ) : (
              <div className="text-center py-4 flex flex-col items-center gap-3">
                <p className="text-gray-600 font-medium">{t.signInPrompt}</p>
                <button
                  onClick={signInWithGoogle}
                  className="bg-[#0F2C59] hover:bg-[#081a38] text-white font-bold py-3 px-8 rounded-full shadow-md transition-all"
                >
                  {t.signInBtn}
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
