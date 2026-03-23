
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
  return (
    <section className="pt-40 pb-20 px-6 md:px-12 flex flex-col items-center text-center">
      <h1 className="text-[80px] font-bold tracking-tight leading-none mb-12 w-[331.719px] h-[84px] flex items-center justify-center">YI NAEUI</h1>
      
      <div className="max-w-2xl space-y-8">
        <h2 className="text-3xl font-bold text-[#888888]">흐름과 맥락으로 해결하는 디자이너</h2>
      </div>
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

const Work: React.FC<{ onSelectProject: (project: any) => void }> = ({ onSelectProject }) => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal scroll distance based on number of projects
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${Math.max(0, (PROJECTS.length * 498 - window.innerWidth + 100) / (PROJECTS.length * 498) * 100)}%`]);

  return (
    <section ref={targetRef} className="relative h-[300vh] border-t border-zinc-100">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#FFFFFE]">
        <div className="max-w-[1800px] mx-auto w-full px-6 md:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <p className="text-detail text-zinc-400 mb-8">WORK</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div style={{ x }} className="flex gap-12 px-6 md:px-12">
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id} 
                onClick={() => onSelectProject(project)}
                whileHover={{ y: -10 }}
                className="group relative flex-shrink-0 w-[85vw] md:w-[450px] cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 rounded-2xl mb-8 border border-zinc-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-contain project-thumbnail"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                        <ArrowUpRight className="text-black" size={32} />
                     </div>
                  </div>
                </div>
                <div className="flex justify-between items-start border-l-2 border-zinc-100 pl-6 group-hover:border-black transition-colors duration-500">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-zinc-800 transition-colors">{project.title}</h3>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">{project.role}</p>
                      <p className="text-[10px] text-zinc-300 font-medium uppercase tracking-widest">{project.keyPoints}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 h-[2px] bg-zinc-100 rounded-full overflow-hidden">
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
    <footer className="pt-20 pb-12 px-6 bg-[#FFFFFE] border-t border-zinc-100">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-zinc-100 gap-6">
          <p className="text-detail text-zinc-400">© 2026 NAEUI YI. ALL RIGHTS RESERVED.</p>
          <p className="text-detail text-zinc-400">DESIGN ARCHIVE</p>
        </div>
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
