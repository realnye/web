
import React, { useState, useEffect } from 'react';
import { HashRouter, Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PROJECTS } from './constants';
import { ProjectCategory } from './types';

// Add global type definition for window.amplitude to fix TS errors
declare global {
  interface Window {
    amplitude?: {
      track: (eventName: string, eventProperties?: Record<string, any>) => void;
      identify: (identifyInstance: any) => void;
      Identify: new () => any;
    };
  }
}

// --- Helper Functions ---

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Components ---

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav text-[#888888]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <span className="text-sm font-medium tracking-tight">2026</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <a href="mailto:canyeroom@gmail.com" className="text-sm font-medium tracking-tight hover:text-black transition-colors">canyeroom@gmail.com</a>
        </div>

        <div className="flex-1 flex items-center justify-end">
          <span className="text-sm font-medium tracking-tight">portfolio</span>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const heroRef = React.useRef<HTMLElement>(null);
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const words = ['YI', 'NAEUI'];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative pt-40 pb-20 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden min-h-[60vh] justify-center"
    >
      {/* Aurora blobs */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ x: mouse.x * 80 - 40, y: mouse.y * 60 - 30 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
        style={{
          width: 600, height: 600,
          top: '50%', left: '50%',
          marginLeft: -300, marginTop: -300,
          background: 'radial-gradient(ellipse, rgba(200,190,255,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 400, height: 400,
          top: '20%', left: '15%',
          background: 'radial-gradient(ellipse, rgba(180,230,220,0.28) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -15, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          width: 350, height: 350,
          top: '30%', right: '10%',
          background: 'radial-gradient(ellipse, rgba(255,210,190,0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Cursor glow */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          left: `${mouse.x * 100}%`,
          top: `${mouse.y * 100}%`,
        }}
        transition={{ opacity: { duration: 0.3 }, left: { type: 'spring', stiffness: 200, damping: 30 }, top: { type: 'spring', stiffness: 200, damping: 30 } }}
        style={{
          width: 300, height: 300,
          marginLeft: -150, marginTop: -150,
          background: 'radial-gradient(circle, rgba(150,130,255,0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Title */}
      <h1 className="relative z-10 text-[80px] md:text-[120px] font-bold tracking-tight leading-none mb-10 flex gap-6">
        {words.map((word, wi) => (
          <span key={wi} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: wi * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 text-2xl md:text-3xl font-normal text-[#888888]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        흐름과 맥락으로 해결하는 디자이너
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <motion.div
          className="w-[1px] h-12 bg-zinc-300 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

const ProjectDetail: React.FC<{ 
  project: any; 
  isOpen: boolean; 
  onClose: () => void 
}> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-white border-t border-zinc-100 rounded-t-[40px] max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Drag Handle Visual */}
            <div className="sticky top-0 left-0 right-0 h-8 flex items-center justify-center bg-white z-10">
              <div className="w-12 h-1 bg-zinc-100 rounded-full" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 pb-12 md:px-12 md:pb-20">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors"
              >
                <X size={24} className="text-black" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div>
                    <p className="text-detail text-zinc-400 mb-4">{project.category}</p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-8 text-black">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      <span className="px-4 py-2 bg-zinc-50 rounded-full text-xs font-bold uppercase tracking-widest border border-zinc-100 text-zinc-600">
                        {project.role}
                      </span>
                    </div>
                  </div>

                    <div className="space-y-8">
                    <div>
                      <h4 className="text-detail text-zinc-300 mb-4">Overview</h4>
                      <p className="text-xl text-zinc-800 font-bold leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-detail text-zinc-300 mb-4">Key Details</h4>
                      <ul className="space-y-3">
                        {project.details?.map((detail: string, i: number) => (
                          <li key={i} className="text-zinc-500 leading-relaxed flex gap-3">
                            <span className="text-zinc-300">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col gap-8">
                    {project.subImages?.map((img: string, i: number) => (
                      <div key={i} className="w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
                        <img
                          src={img}
                          alt={`Detail ${i + 1}`}
                          className="w-full h-auto object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// 공통 프로젝트 카드
const ProjectCard: React.FC<{ project: any; onClick: () => void; className?: string }> = ({ project, onClick, className }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ y: -6 }}
    className={`group relative cursor-pointer ${className ?? ''}`}
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 rounded-2xl mb-5 border border-zinc-100">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-contain project-thumbnail"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
          <ArrowUpRight className="text-black" size={24} />
        </div>
      </div>
    </div>
    <div className="border-l-2 border-zinc-100 pl-5 group-hover:border-black transition-colors duration-500">
      <h3 className="text-xl font-bold mb-2 leading-tight">{project.title}</h3>
      <p className="text-[10px] text-zinc-400 font-normal uppercase tracking-[0.2em]">{project.role}</p>
      <p className="text-[10px] text-zinc-400 font-normal uppercase tracking-widest">{project.keyPoints}</p>
    </div>
  </motion.div>
);

const Work: React.FC<{ onSelectProject: (project: any) => void }> = ({ onSelectProject }) => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${Math.max(0, (PROJECTS.length * 498 - (typeof window !== 'undefined' ? window.innerWidth : 1440) + 100) / (PROJECTS.length * 498) * 100)}%`]
  );

  const sectionHeader = (
    <div className="w-full px-6 md:px-12 mb-10">
      <p className="text-detail text-zinc-400">WORK</p>
    </div>
  );

  // 모바일: 세로 2열 그리드
  if (isMobile) {
    return (
      <section className="border-t border-zinc-100 py-20 bg-[#FFFFFE]">
        {sectionHeader}
        <div className="px-6 grid grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onSelectProject(project)}
            />
          ))}
        </div>
      </section>
    );
  }

  // 데스크탑: 가로 스크롤 (스크롤 연동)
  return (
    <section ref={targetRef} className="relative h-[300vh] border-t border-zinc-100">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#FFFFFE]">
        {sectionHeader}
        <div className="relative">
          <motion.div style={{ x }} className="flex gap-12 px-12">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onSelectProject(project)}
                className="flex-shrink-0 w-[450px]"
              />
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-12 right-12 h-[2px] bg-zinc-100 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute top-0 left-0 h-full w-full bg-black origin-left"
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 bg-[#FFFFFE] border-t border-zinc-100">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm font-normal tracking-tight text-zinc-400">© YI NAEUI</p>
        <p className="text-sm font-normal tracking-tight text-zinc-400">uxui design archive</p>
      </div>
    </footer>
  );
};

// --- Pages ---

const MainPage: React.FC<{ 
  onSelectProject: (project: any) => void;
}> = ({ onSelectProject }) => {
  return (
    <main>
      <Hero />
      <div id="work">
        <Work onSelectProject={onSelectProject} />
      </div>
    </main>
  );
};

// --- App ---

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSelectProject = (project: any) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }, [pathname]);
    return null;
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#FFFFFE] text-black">
        <Header />
        
        <MainPage 
          onSelectProject={handleSelectProject}
        />

        <Footer />
        <ProjectDetail 
          project={selectedProject} 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
        />
      </div>
    </HashRouter>
  );
};

export default App;
