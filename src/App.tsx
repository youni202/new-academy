/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Wrench, 
  Cpu, 
  BookOpen, 
  Video, 
  Music, 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { LECTURES, REVIEWS, PARTNERS } from './constants';

const IconMap: Record<string, React.ElementType> = {
  Terminal,
  Wrench,
  Cpu,
  BookOpen,
  Video,
  Music,
};

const SectionReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const HoverText = ({ en, ko, className = "" }: { en: React.ReactNode, ko: React.ReactNode, className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isHovered ? 'ko' : 'en'}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isHovered ? ko : en}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activeLecture, setActiveLecture] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero 3-stage scroll transforms
  const hero1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]);
  const hero1Scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  const hero2Opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.2], [0, 1, 0]);
  const hero2Y = useTransform(scrollYProgress, [0.1, 0.15, 0.2], [50, 0, -50]);
  
  const hero3Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.3], [0, 1, 0]);
  const hero3Scale = useTransform(scrollYProgress, [0.2, 0.3], [1.2, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter pointer-events-auto"
        >
          AURA<span className="text-pastel-purple">.</span>
        </motion.div>
        <div className="flex items-center gap-8 pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 glass rounded-full hover:bg-white/60 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section (3-Stage Interaction) */}
      <section className="h-[400vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Stage 1: Philosophy */}
          <motion.div 
            style={{ opacity: hero1Opacity, scale: hero1Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-black uppercase mb-8">
              Human-Centric <br /> Philosophy
            </h1>
            <p className="max-w-xl mx-auto text-lg text-deep-ink/60 font-light">
              AI is not a replacement, but an extension of human intuition and creative soul.
            </p>
          </motion.div>

          {/* Stage 2: Vision */}
          <motion.div 
            style={{ opacity: hero2Opacity, y: hero2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-black uppercase mb-8 text-pastel-purple">
              Spatial <br /> Vision
            </h1>
            <p className="max-w-xl mx-auto text-lg text-deep-ink/60 font-light">
              Bridging the gap between digital logic and physical emotion through spatial harmony.
            </p>
          </motion.div>

          {/* Stage 3: Future */}
          <motion.div 
            style={{ opacity: hero3Opacity, scale: hero3Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-black uppercase mb-8">
              The Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-green">
                Of Intelligence
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-deep-ink/60 font-light">
              Empowering the next generation of creative pioneers in the era of co-creation.
            </p>
          </motion.div>

          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-pastel-blue/30 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-pastel-purple/30 rounded-full blur-[120px]" 
            />
          </div>
        </div>
      </section>

      {/* Vision Section (Korean Only) */}
      <SectionReveal className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              생각과 생각 <br /> 사이의 <br /> 공간.
            </h2>
            <p className="text-xl text-deep-ink/70 leading-relaxed mb-12">
              우리는 단순히 도구만을 가르치지 않습니다. 상호작용의 철학을 가르칩니다. 
              Aura는 AI가 인간의 대체제가 아닌, 영혼의 확장이라고 믿는 이들을 위한 안식처입니다.
            </p>
            <div className="flex gap-4">
              {['미니멀', '공간감', '몰입형'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full border border-deep-ink/10 text-sm font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue to-pastel-purple rounded-3xl rotate-3 opacity-20" />
            <img 
              src="https://picsum.photos/seed/aura1/800/800" 
              alt="Vision" 
              className="w-full h-full object-cover rounded-3xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </SectionReveal>

      {/* Lectures Section (Sub Menus: En -> Ko Hover) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <HoverText en="Curated Mastery." ko="엄선된 마스터 클래스." />
            </h2>
            <p className="text-deep-ink/50 font-mono">
              <HoverText en="06 Specialized Domains" ko="06개의 전문 영역" />
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LECTURES.map((lecture, idx) => {
              const Icon = IconMap[lecture.icon];
              return (
                <motion.div
                  key={lecture.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveLecture(lecture)}
                  className={`group relative p-10 rounded-[2.5rem] cursor-pointer spatial-card ${lecture.color} overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      <HoverText en={lecture.title} ko={lecture.titleKo} />
                    </h3>
                    <p className="text-deep-ink/60 mb-8">
                      <HoverText en={lecture.description} ko={lecture.descriptionKo} />
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                      <HoverText en="Explore" ko="상세보기" /> <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section (Korean Only) */}
      <SectionReveal className="py-40 px-6 bg-deep-ink text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-12 italic">
            "미래를 예측하는 가장 좋은 방법은 미래를 직접 디자인하는 것이다."
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed">
            우리의 커리큘럼은 기술적 숙련도가 정서적 공명과 만나는 '바이브 코딩'의 원칙 위에 세워졌습니다. 
            우리는 단순히 앱을 만들지 않습니다. 숨을 쉬는 경험을 만듭니다.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/20 rounded-full animate-pulse" />
        </div>
      </SectionReveal>

      {/* Social & Trust (Korean Only) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {REVIEWS.map((review, idx) => (
              <SectionReveal key={idx} className="p-8 glass rounded-3xl">
                <p className="text-lg mb-8 italic">"{review.contentKo}"</p>
                <div>
                  <p className="font-bold">{review.nameKo}</p>
                  <p className="text-sm text-deep-ink/50">{review.roleKo}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-32 pt-20 border-t border-deep-ink/5 flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale">
            {PARTNERS.map(partner => (
              <span key={partner} className="text-2xl font-display font-bold tracking-tighter">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (Korean Only) */}
      <SectionReveal className="py-32 px-6 bg-pastel-blue/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">함께 미래를 만듭니다.</h2>
          <p className="text-deep-ink/60 mb-12">궁금한 점이 있으신가요? 저희 팀이 당신의 AI 여정을 안내해 드립니다.</p>
          
          <form className="space-y-4 text-left">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="이름" 
                className="w-full p-6 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-pastel-purple transition-all"
              />
              <input 
                type="email" 
                placeholder="이메일" 
                className="w-full p-6 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-pastel-purple transition-all"
              />
            </div>
            <textarea 
              placeholder="문의 내용" 
              rows={4}
              className="w-full p-6 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-pastel-purple transition-all"
            />
            <button className="w-full py-6 bg-deep-ink text-white rounded-2xl font-bold text-lg hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-2">
              메시지 보내기 <Mail size={20} />
            </button>
          </form>
          
          <p className="mt-8 text-xs text-deep-ink/40 font-mono">
            * 모든 문의는 실시간 응대를 위해 구글 시트 데이터베이스와 동기화됩니다.
          </p>
        </div>
      </SectionReveal>

      {/* Footer (Korean Only) */}
      <footer className="py-12 px-6 border-t border-deep-ink/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-display font-bold tracking-tighter">AURA.</div>
          <div className="flex gap-8 text-sm font-mono text-deep-ink/50">
            <a href="#" className="hover:text-deep-ink transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-deep-ink transition-colors">이용약관</a>
            <a href="#" className="hover:text-deep-ink transition-colors">인스타그램</a>
          </div>
          <p className="text-xs text-deep-ink/30">© 2026 Aura AI Academy. 공간 시대를 위한 디자인.</p>
        </div>
      </footer>

      {/* Lecture Detail Modal (Sub Menus: En -> Ko Hover) */}
      <AnimatePresence>
        {activeLecture && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-deep-ink/40 backdrop-blur-sm" onClick={() => setActiveLecture(null)} />
            <motion.div 
              layoutId={activeLecture.id}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl glass rounded-[3rem] p-12 overflow-hidden`}
            >
              <button 
                onClick={() => setActiveLecture(null)}
                className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 ${activeLecture.color} rounded-2xl flex items-center justify-center mb-8`}>
                  {React.createElement(IconMap[activeLecture.icon], { size: 32 })}
                </div>
                <h3 className="text-4xl font-bold mb-4">
                  <HoverText en={activeLecture.title} ko={activeLecture.titleKo} />
                </h3>
                <p className="text-xl text-deep-ink/70 mb-8 leading-relaxed">
                  <HoverText en={activeLecture.details} ko={activeLecture.detailsKo} />
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-pastel-green" />
                    <HoverText en="12+ Hours of Content" ko="12시간 이상의 고품질 콘텐츠" />
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-pastel-purple" />
                    <HoverText en="Lifetime Community Access" ko="평생 소장 및 커뮤니티 접근 권한" />
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-pastel-blue" />
                    <HoverText en="1-on-1 Mentorship Session" ko="1:1 멘토링 세션 포함" />
                  </div>
                </div>

                <button className="w-full py-6 bg-deep-ink text-white rounded-2xl font-bold text-xl hover:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  <HoverText en="Enroll Now" ko="수강 신청하기" /> <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Menu Overlay (Sub Menus: En -> Ko Hover) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex items-center justify-center"
          >
            <div className="text-center space-y-8">
              {[
                { en: 'Vision', ko: '비전' },
                { en: 'Lectures', ko: '강의' },
                { en: 'Philosophy', ko: '철학' },
                { en: 'Reviews', ko: '리뷰' },
                { en: 'Contact', ko: '문의' }
              ].map((item, idx) => (
                <motion.div 
                  key={item.en}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  <a 
                    href={`#${item.en.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl md:text-7xl font-bold hover:text-pastel-purple transition-colors"
                  >
                    <HoverText en={item.en} ko={item.ko} />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
