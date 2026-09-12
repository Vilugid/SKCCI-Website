import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ExternalLink, 
  BookOpen, 
  MapPin, 
  Laptop, 
  Award, 
  CheckCircle2, 
  Globe, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  HeartHandshake,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { TabItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FormalEducationProps {
  handleTabClick?: (tab: TabItem) => void;
}

// 3 curated slideshow images representing theological scholarship, graduation, and cohort learning
const SLIDES = [
  {
    id: 'library',
    title: 'Theological Library & Biblical Research',
    titleTl: 'Teolohikong Aklatan at Biblikal na Pananaliksik',
    desc: 'Deep scriptural study with open Bibles, concordances, and original language lexicons.',
    descTl: 'Malalim na pag-aaral ng Kasulatan gamit ang study Bibles, concordances, at lexicons.',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'graduation',
    title: 'Seminary Graduation & Academic Regalia',
    titleTl: 'Pagtatapos sa Seminaryo at Toga',
    desc: 'Equipping called ministers and leaders with accredited theological degrees.',
    descTl: 'Paghahanda sa mga tinawag na manggagawa gamit ang kinikilalang degrees.',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'campus',
    title: 'Collaborative Study & Ministry Fellowship',
    titleTl: 'Sama-samang Pag-aaral at Samahan sa Ministeryo',
    desc: 'Pastors, church planters, and leaders growing together in rigorous biblical discussions.',
    descTl: 'Mga pastor at cell leaders na sama-samang humuhubog sa Salita ng Diyos.',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function FormalEducation({ handleTabClick }: FormalEducationProps) {
  const { isTagalog } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Left-Aligned Header (Matches Events & RSVPs and Leader Tools layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#C82323] text-xs font-semibold mb-3 tracking-wide">
              <GraduationCap size={15} className="text-[#C82323]" />
              <span>{isTagalog ? 'Teolohikong Pagsasanay at Edukasyon' : 'Theological Training Directory'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] font-serif tracking-tight">
              {isTagalog ? 'Pormal na Edukasyon' : 'Formal Education'}
            </h1>
            
            <p className="mt-2 text-base sm:text-lg text-gray-600 font-medium">
              {isTagalog 
                ? 'Ihanda ang Iyong Tawag: Makamit ang Kinikilalang mga Kursong Teolohiko' 
                : 'Equip Your Calling: Earn Recognized Theological Degrees'}
            </p>

            <p className="mt-1 text-sm text-gray-500 max-w-2xl">
              {isTagalog
                ? 'Para sa mga manggagawa, lider, at bawat nagnanais ng mas malalim na kaalaman sa Banal na Kasulatan. Tuklasin ang mga kinikilalang programa sa seminaryo.'
                : 'For emerging ministers, cell leaders, and every believer desiring rigorous scriptural grounding. Explore accredited seminary and degree options.'}
            </p>
          </div>

          {/* Quick Stats / Verified Directory Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-3 px-4 shadow-2xs text-left">
              <div className="text-xs text-gray-500 font-medium">
                {isTagalog ? 'Mga Kinikilalang Seminaryo' : 'Recognized Institutions'}
              </div>
              <div className="text-lg font-bold text-[#0F2C59] flex items-center gap-2 mt-0.5">
                <span>2 Accredited Options</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Hero Banner with 3-Photo Auto Slideshow */}
        <section aria-label="Formal Education Overview" className="bg-white rounded-3xl border border-gray-200/90 shadow-xs overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Side: Theological Context & Scripture Anchor */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C82323] bg-red-50 border border-red-100/80 px-2.5 py-1 rounded-md">
                  {isTagalog ? 'Akademiko at Ministeryo' : 'Biblical Scholarship & Calling'}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2C59] font-serif mt-3 leading-tight">
                  {isTagalog 
                    ? 'Palalimin ang Kaalaman sa Banal na Kasulatan' 
                    : 'Equip Your Ministry with Sound Doctrine & Theological Depth'}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                  {isTagalog
                    ? 'Ang pormal na teolohikong pag-aaral ay nagbibigay ng matibay na pundasyon sa hermeneutics, mga orihinal na wika ng Bibliya, sistematikong teolohiya, at praktikal na pamumuno upang makapaglingkod nang may kahusayan sa iglesya.'
                    : 'Formal theological education provides rigorous training in biblical hermeneutics, systematic theology, church history, and pastoral ministry, equipping leaders to handle the Word of God with excellence.'}
                </p>
              </div>

              {/* Scripture Anchor Card */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-gray-200/90">
                <p className="text-xs sm:text-sm font-serif italic text-gray-700 leading-relaxed">
                  {isTagalog 
                    ? '“Pagsikapan mong humarap sa Diyos bilang kalugud-lugod na manggagawa, walang dapat ikahiya, at tapat na nagtuturo ng salita ng katotohanan.”' 
                    : '“Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.”'}
                </p>
                <p className="text-xs font-bold text-[#C82323] mt-2 tracking-wider uppercase">
                  — 2 Timothy 2:15
                </p>
              </div>
            </div>

            {/* Right Side: Smooth Auto Slideshow */}
            <div className="lg:col-span-5 bg-slate-900 relative min-h-[320px] sm:min-h-[380px] flex flex-col justify-between p-5 sm:p-6 overflow-hidden group">
              
              {/* Render all 3 images with smooth opacity transition */}
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                </div>
              ))}

              {/* Top Row: Navigation Arrows (Visible on hover) */}
              <div className="relative z-10 flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Bottom Caption & Indicators */}
              <div className="relative z-10 mt-auto text-white">
                <p className="text-base sm:text-lg font-bold font-serif leading-tight drop-shadow-xs">
                  {isTagalog ? SLIDES[currentSlide].titleTl : SLIDES[currentSlide].title}
                </p>
                <p className="text-xs sm:text-sm text-gray-200 leading-snug line-clamp-2 mt-1 drop-shadow-xs">
                  {isTagalog ? SLIDES[currentSlide].descTl : SLIDES[currentSlide].desc}
                </p>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/20">
                  {SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? 'w-6 bg-white shadow-xs'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                  <span className="ml-auto text-[11px] text-white/75 font-medium tracking-wider">
                    {currentSlide + 1} / {SLIDES.length}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Two Primary Institution Cards (Side-by-Side on Desktop, Single Column on Mobile) */}
        <section aria-label="Theological Institutions Directory" className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* OPTION 1: Asian Theological Seminary (ATS) */}
          <article className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            
            {/* Institution Card Visual Header Photo */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
              <img 
                src="/ats.jpg" 
                alt="Asian Theological Seminary (ATS)"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-gray-900 backdrop-blur-xs shadow-2xs">
                  <Building2 size={13} className="text-amber-700" />
                  {isTagalog ? 'Face-to-Face / Residensyal' : 'In-Person / Hybrid'}
                </span>

                <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  {isTagalog ? 'Kinikilala ng ATA' : 'ATA Accredited'}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-bold font-serif drop-shadow-xs">
                  Asian Theological Seminary (ATS)
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-200 mt-1">
                  <MapPin size={13} className="text-red-400 flex-shrink-0" />
                  <span>Quezon City, Philippines · On-Campus &amp; Blended</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {isTagalog 
                    ? 'Isang nangungunang evangelical seminary na itinatag noong 1969, kinikilala ng Asia Theological Association (ATA). Nag-aalok ng graduate certificates, Master of Divinity (M.Div.), Master of Arts (M.A.), at doctoral programs na nakatutok sa biblikal na kaalaman, pastoral care, at kontekstwal na ministeryo sa Asya.'
                    : 'A premier evangelical seminary established in 1969, accredited by the Asia Theological Association (ATA). Offers graduate certificates, Master of Divinity (M.Div.), Master of Arts (M.A.), and doctoral programs focused on biblical scholarship, pastoral care, and contextual Asian ministry.'}
                </p>

                {/* Programs and Degrees */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Award size={14} className="text-[#C82323]" />
                    {isTagalog ? 'Mga Programa at Degrees' : 'Degrees & Academic Programs'}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {['Master of Divinity (M.Div.)', 'Master of Arts (M.A.)', 'Graduate Diplomas', 'Th.M. & Doctoral Studies', 'Biblical Counseling'].map((deg) => (
                      <span 
                        key={deg}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200"
                      >
                        {deg}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{isTagalog ? 'Pang-akademikong kalidad na may 50+ taon ng evangelical heritage' : 'Rigorous academic tradition with over 50 years of evangelical heritage'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{isTagalog ? 'Maluwag na seminary campus sa Scout Madriñan, Quezon City' : 'Vibrant learning community located along Scout Madriñan, QC'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{isTagalog ? 'Blended at modular schedules na angkop para sa mga aktibong pastor' : 'Blended, evening, and modular cohorts suitable for working pastors'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card CTA Footer */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700 block sm:inline">
                    {isTagalog ? 'Opisyal na Website:' : 'Official Portal:'}
                  </span>{' '}
                  ats.ph
                </div>

                <a
                  href="https://ats.ph/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C82323] hover:bg-[#a11b1b] text-white text-sm font-bold shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group/btn"
                >
                  <span>{isTagalog ? 'Galugarin ang ATS Programs' : 'Explore ATS Programs'}</span>
                  <ExternalLink size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </article>

          {/* OPTION 2: Christian Leaders Institute (CLI) */}
          <article className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            
            {/* Institution Card Visual Header Photo */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                alt="Christian Leaders Institute Online Learning"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-gray-900 backdrop-blur-xs shadow-2xs">
                  <Laptop size={13} className="text-blue-700" />
                  {isTagalog ? '100% Online / Sariling Bilis' : '100% Online / Self-Paced'}
                </span>

                <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                  <Globe size={14} className="text-blue-400" />
                  {isTagalog ? 'Global & Abot-kaya' : 'Global & Low-Cost'}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-bold font-serif drop-shadow-xs">
                  Christian Leaders Institute (CLI)
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-200 mt-1">
                  <Laptop size={13} className="text-blue-300 flex-shrink-0" />
                  <span>100% Online · Global · Self-Paced</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {isTagalog 
                    ? 'Abot-kaya at kinikilalang programa sa degree para sa ministeryo. Mag-aral ng tuition-free coursework na nagbibigay-daan sa murang Associate at Bachelor degrees sa Divinity, Christian Leadership, Chaplaincy, at Church Planting na dinisenyo para sa mga nagtatrabahong bi-vocational na manggagawa.'
                    : 'Accessible, low-cost accredited ministry degree programs. Earn tuition-free coursework leading to affordable Associate and Bachelor degrees in Divinity, Christian Leadership, Chaplaincy, and Church Planting designed for working bi-vocational ministers.'}
                </p>

                {/* Programs and Degrees */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Award size={14} className="text-[#C82323]" />
                    {isTagalog ? 'Mga Programa at Degrees' : 'Degrees & Academic Programs'}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {['Bachelor of Divinity (B.Div.)', 'Christian Leadership Degree', 'Associate in Ministry', 'Chaplaincy Certification', 'Tuition-Free Lectures'].map((deg) => (
                      <span 
                        key={deg}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200"
                      >
                        {deg}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{isTagalog ? 'Tuition-free lectures na may minimal administrative fee lang kapag kukuha ng degree' : 'Tuition-free learning model with minimal fee only for degree conferral'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{isTagalog ? '100% online at self-paced—mag-aral ayon sa iyong oras at iskedyul' : '100% online & self-paced—study anytime on mobile or desktop'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{isTagalog ? 'Mainam para sa bi-vocational leaders, cell workers, at church planters' : 'Tailored specifically for bi-vocational leaders and church planters'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card CTA Footer */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700 block sm:inline">
                    {isTagalog ? 'Opisyal na Website:' : 'Official Portal:'}
                  </span>{' '}
                  christianleadersinstitute.org
                </div>

                <a
                  href="https://www.christianleadersinstitute.org/academics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2C59] hover:bg-[#163a70] text-white text-sm font-bold shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group/btn"
                >
                  <span>{isTagalog ? 'Tingnan ang CLI Academics' : 'View CLI Academics'}</span>
                  <ExternalLink size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </article>

        </section>

        {/* Pastoral Guidance & Church Endorsement Section */}
        <section className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 lg:p-10 shadow-xs text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 text-[#C82323] text-xs font-bold uppercase tracking-wider mb-3 border border-red-100/70">
              <HeartHandshake size={14} />
              <span>{isTagalog ? 'GABAY MULA SA SIMBAHAN' : 'PASTORAL GUIDANCE & ENDORSEMENT'}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0F2C59] font-serif mb-3">
              {isTagalog ? 'Nais Mo Bang Magpatuloy sa Pag-aaral?' : 'Are You Considering Formal Ministry Studies?'}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              {isTagalog
                ? 'Buong pusong sinusuportahan ng pamunuan ng SAVIOR-KING Commission Church International ang bawat miyembro at lider na nagnanais lumalim sa Banal na Kasulatan at teolohiya. Maaari kayong sumangguni sa ating mga pastor para sa prayer covering, mentorship, at pastoral recommendation letters na kinakailangan sa inyong admission.'
                : 'The pastoral leadership of SAVIOR-KING Commission Church International actively supports members and leaders pursuing accredited theological education. Feel free to connect with our pastors for prayer covering, academic mentorship, and pastoral recommendation letters required for seminary admissions.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {handleTabClick && (
                <button
                  type="button"
                  onClick={() => handleTabClick('Leader Tools')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F2C59] hover:text-[#C82323] transition-colors cursor-pointer"
                >
                  <BookOpen size={16} />
                  <span>{isTagalog ? 'Buksan ang Leader Tools' : 'Open Leader Tools'}</span>
                  <ArrowRight size={14} />
                </button>
              )}

              {handleTabClick && (
                <button
                  type="button"
                  onClick={() => handleTabClick('Manuals')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-[#C82323] transition-colors cursor-pointer sm:ml-4"
                >
                  <Sparkles size={16} />
                  <span>{isTagalog ? 'Tingnan ang Church Discipleship Manuals' : 'Explore Church Discipleship Manuals'}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
