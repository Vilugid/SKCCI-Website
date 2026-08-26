import React, { useState } from 'react';
import { Copy, CheckCircle2, Heart, QrCode, X } from 'lucide-react';

export default function Giving() {
  const [copied, setCopied] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const accountNumber = '3819017068';

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-16 bg-[#FAFAFA] sm:py-24 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-6">
            <Heart size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-serif">
            Giving & Stewardship
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Your generosity helps us continue our mission, serve our community, and share the love of Christ.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto">
          <div className="px-6 py-8 sm:p-10 border-b border-gray-100 bg-[#FAFAFA]/50">
            <h3 className="text-xl font-semibold text-gray-900 text-center flex items-center justify-center gap-2">
              Bank Transfer <QrCode size={20} className="text-gray-400" />
            </h3>
          </div>
          <div className="px-6 py-8 sm:p-10">
            
            {/* QR Code Section */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-4 text-center">Scan to Pay via InstaPay</p>
              <div 
                className="w-48 h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-red-300 transition-colors group overflow-hidden relative"
                onClick={() => setIsQRModalOpen(true)}
              >
                {/* Add standard image fallback/placeholder path that user can replace or upload to */}
                <img 
                  src="/bpi-qr-code.jpg" 
                  alt="BPI InstaPay QR Code" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden flex-col items-center justify-center text-gray-400 group-hover:text-red-500 transition-colors">
                  <QrCode size={40} className="mb-2" />
                  <span className="text-xs font-medium text-center px-2">Tap to view<br/>QR Code</span>
                </div>
                
                {/* Hover overlay for image */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-white/90 backdrop-blur rounded-full p-2 shadow-sm">
                     <QrCode size={20} className="text-gray-900" />
                   </div>
                </div>
              </div>
            </div>

            <dl className="space-y-6 text-base text-gray-600">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <dt className="font-medium text-gray-500">Bank</dt>
                <dd className="font-bold text-gray-900">BPI (InstaPay enabled)</dd>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <dt className="font-medium text-gray-500">Account Name</dt>
                <dd className="font-bold text-gray-900">Marianita Carandang</dd>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3">
                <dt className="font-medium text-gray-500 mb-2 sm:mb-0">Account Number</dt>
                <dd className="flex items-center">
                  <span className="font-mono text-xl font-bold text-gray-900 mr-4 tracking-wider">{accountNumber}</span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    title="Copy Account Number"
                  >
                    {copied ? <CheckCircle2 size={20} className="text-green-600" /> : <Copy size={20} />}
                  </button>
                </dd>
              </div>
            </dl>
            
            <div className={`mt-6 text-center transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle2 size={16} className="mr-2" />
                Account Number Copied!
              </span>
            </div>
            
          </div>
        </div>

      </div>

      {/* QR Code Lightbox Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity" onClick={() => setIsQRModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden z-10 scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 flex justify-end absolute top-0 right-0 z-20">
              <button 
                onClick={() => setIsQRModalOpen(false)}
                className="bg-black/10 hover:bg-black/20 text-gray-800 rounded-full p-2 backdrop-blur transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="pt-12 pb-8 px-8 text-center bg-gray-50 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Scan to Pay</h3>
              <p className="text-sm text-gray-500">BPI InstaPay</p>
            </div>
            <div className="p-8 flex justify-center bg-white">
              <img 
                src="/bpi-qr-code.jpg" 
                alt="BPI InstaPay QR Code Full" 
                className="w-full max-w-[250px] h-auto rounded-xl shadow-sm border border-gray-100"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden flex-col items-center justify-center p-12 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 w-full max-w-[250px] aspect-square">
                <QrCode size={48} className="mb-4 text-gray-300" />
                <span className="text-sm text-center">QR Code image not found.<br/>Please upload to /public/bpi-qr-code.jpg</span>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm font-bold text-gray-900">Marianita Carandang</p>
              <p className="text-xs text-gray-500 font-mono mt-1">{accountNumber}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
