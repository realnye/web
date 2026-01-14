
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Instagram, Mail, ArrowRight } from 'lucide-react';
import CoffeeChatModal from './components/CoffeeChatModal';
import { PROJECTS, EXPERIENCES, STACKS } from './constants';
import { ProjectCategory } from './types';
import { ABTestManager, ABGroup, AnalyticsProvider } from './lib/ab-test';

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

// --- AB Test Framework ---

interface ABContextType {
  group: ABGroup;
}

const ABContext = createContext<ABContextType | undefined>(undefined);

const ABTestProvider: React.FC<{
  testName: string;
  analytics: AnalyticsProvider;
  children: React.ReactNode;
}> = ({ testName, analytics, children }) => {
  const manager = useMemo(() => new ABTestManager({ testName }), [testName]);
  const group = useMemo(() => manager.getOrAssignGroup(), [manager]);

  useEffect(() => {
    // Amplitude가 로드된 후 로그 전송
    const logWhenReady = () => {
      // Fix: TypeScript now recognizes amplitude property on window
      if (window.amplitude) {
        manager.logAssignment(analytics);
      } else {
        setTimeout(logWhenReady, 500);
      }
    };
    logWhenReady();
  }, [manager, analytics]);

  return <ABContext.Provider value={{ group }}>{children}</ABContext.Provider>;
};

const useABTest = () => {
  const context = useContext(ABContext);
  if (!context) throw new Error('useABTest must be used within ABTestProvider');
  return context;
};

// --- Analytics Adapter ---

const amplitudeAdapter: AnalyticsProvider = {
  trackEvent: (name, props) => {
    // Fix: TypeScript now recognizes amplitude property on window
    window.amplitude?.track(name, props);
  },
  setUserProperty: (props) => {
    // Fix: TypeScript now recognizes amplitude property on window
    if (window.amplitude) {
      const identify = new window.amplitude.Identify();
      Object.entries(props).forEach(([k, v]) => identify.set(k, v as any));
      window.amplitude.identify(identify);
    }
  }
};

// --- Helper Functions ---

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Components ---

const Header: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/';

  const navItems = [
    { name: 'INFO', id: 'info' },
    { name: 'WORK', id: 'work' },
    { name: 'PROCESS', id: 'process' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (isMainPage) {
      scrollToSection(id);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(id), 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-12">
          <Link to="/" className="text-sm font-black tracking-tighter">YNY | UXUI DESIGNER</Link>
          <div className="hidden lg:flex items-center gap-8 border-l border-white/20 pl-12">
            <a href="mailto:canyeroom@gmail.com" className="text-detail text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <Mail size={12}/> EMAIL
            </a>
            <a href="https://instagram.com/inyerk__" target="_blank" className="text-detail text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <Instagram size={12}/> IG
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <button 
              key={item.name} 
              onClick={(e) => handleNavClick(e, item.id)} 
              className="text-detail text-zinc-400 hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={onOpenModal}
            className="px-4 py-2 bg-white text-black text-lg font-black uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center leading-none"
            aria-label="Coffee Chat"
          >
            ☕️
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black h-screen animate-in slide-in-from-top duration-300">
          <div className="px-6 py-20 space-y-10 flex flex-col items-center text-center">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={(e) => handleNavClick(e, item.id)} 
                className="text-4xl font-black uppercase tracking-tighter text-white"
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => { onOpenModal(); setIsMenuOpen(false); }}
              className="text-detail text-white border border-white px-8 py-4 rounded-full font-black"
            >
              COFFEE CHAT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-huge cursor-default hero-hover-effect">
          <span className="reveal-line">
            <span className={`reveal-text ${active ? 'active' : ''}`} style={{ transitionDelay: '0.1s' }}>
              HEY,
            </span>
          </span>
          <span className="reveal-line">
            <span className={`reveal-text ${active ? 'active' : ''}`} style={{ transitionDelay: '0.3s' }}>
              IT'S NAEUI
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
};

const Info = () => (
  <section className="py-32 md:py-60 px-6 border-t border-white/5">
    <div className="max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <p className="text-detail text-zinc-500 mb-12">INFO</p>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-16 leading-[1.05]">
            Design Essence.<br />Beyond Boundaries.
          </h2>
          <div className="space-y-16">
            <div>
              <p className="text-detail text-zinc-700 mb-8 tracking-[0.2em]">Experience & Education</p>
              <div className="space-y-12">
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="group border-b border-white/5 pb-8 last:border-0">
                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-4">
                        <h4 className="text-2xl font-black uppercase group-hover:text-zinc-300 transition-colors">{exp.company}</h4>
                        <p className="text-xs text-zinc-500 font-mono">{exp.period}</p>
                    </div>
                    <p className="text-lg text-zinc-300 font-bold mb-3">{exp.role}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">{exp.description}</p>
                  </div>
                ))}
                <div className="pt-8 border-t border-white/5">
                   <h4 className="text-2xl font-black uppercase">연세대학교</h4>
                   <p className="text-lg text-zinc-300 font-bold">산업디자인 전공 (2026. 02 졸업 예정)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-32">
          <div className="space-y-20 bg-zinc-950/50 p-10 md:p-16 rounded-[40px] border border-white/5">
            <div>
              <p className="text-detail text-zinc-700 mb-8 tracking-[0.2em]">Design Stack</p>
              <div className="space-y-10">
                {STACKS.map((stack, i) => (
                  <div key={i}>
                    <h5 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] mb-4">{stack.category}</h5>
                    <p className="text-xl font-bold text-white leading-tight">{stack.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-detail text-zinc-700 mb-8 tracking-[0.2em]">Strength</p>
              <p className="text-lg md:text-xl font-bold text-zinc-400 leading-relaxed italic">
                데이터 기반의 UX 문제 해결 <br />
                브랜드 아이덴티티 구축 <br />
                공간 경험(UX) 최적화
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Work = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory | 'All'>('All');
  const filteredProjects = activeTab === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section className="py-32 md:py-60 px-6 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div>
            <p className="text-detail text-zinc-500 mb-8">WORK</p>
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">WORK</h2>
          </div>
          <div className="flex flex-wrap gap-4 no-scrollbar">
            {['All', ProjectCategory.UXUI, ProjectCategory.Graphic, ProjectCategory.Space].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-detail px-6 py-2 border rounded-full transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          {filteredProjects.map((project) => (
            <a key={project.id} href={project.link} className="group block project-card">
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 rounded-2xl mb-8">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover project-thumbnail" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ArrowUpRight className="text-black" size={24} />
                   </div>
                </div>
              </div>
              <div className="flex justify-between items-start border-l-2 border-zinc-800 pl-6 group-hover:border-white transition-colors duration-500">
                <div>
                  <h3 className="text-xl font-black uppercase mb-2 leading-none">{project.title}</h3>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest mb-1">{project.role}</p>
                  <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest">{project.keyPoints}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => (
  <section className="py-32 md:py-60 px-6 border-t border-white/5 bg-[#050505]">
    <div className="max-w-[1800px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3">
          <p className="text-detail text-zinc-500 mb-8">PROCESS</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
            Not just <br />visuals, <br />but answering <br />the <span className="text-zinc-600">‘Why’</span>
          </h2>
          <p className="text-zinc-400 max-w-sm leading-relaxed text-sm">보이는 것을 넘어, <br />이유 있는 디자인을 지향합니다.</p>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-24">
          {[
            { id: '01', title: 'Define (본질 탐구)', desc: '매체와 관계없이 사용자가 겪는 진짜 문제가 무엇인지 집요하게 질문하고 정의합니다.' },
            { id: '02', title: 'Logic (논리 구축)', desc: '학회와 동아리에서의 협업 경험을 바탕으로, 팀원과 클라이언트를 설득할 수 있는 디자인 근거를 마련합니다.' },
            { id: '03', title: 'Visualizing (구현)', desc: '구축된 논리를 바탕으로 가장 접근성 좋고 심플한 시각 언어로 결과물을 도출합니다.' },
            { id: '04', title: 'Connect (확장)', desc: '디지털(UXUI), 시각(Graphic), 환경(Space)이 유기적으로 연결된 통합적인 경험을 완성합니다.' },
          ].map((step) => (
            <div key={step.id} className="group">
              <span className="text-4xl font-black italic text-zinc-800 group-hover:text-white transition-colors duration-500 font-mono">{step.id}</span>
              <h4 className="text-2xl font-black uppercase mt-6 mb-6 tracking-tighter">{step.title}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/';

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (isMainPage) {
      scrollToSection(id);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(id), 100);
    }
  };

  return (
    <footer className="pt-20 pb-12 px-6 bg-black border-t border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-20">
          <div>
             <p className="text-detail text-zinc-700 mb-8 tracking-[0.3em]">Connect</p>
             <div className="space-y-4">
                <a href="mailto:canyeroom@gmail.com" className="block text-2xl font-black uppercase hover:text-zinc-400 transition-colors">canyeroom@gmail.com</a>
                <a href="https://instagram.com/inyerk__" target="_blank" className="block text-2xl font-black uppercase hover:text-zinc-400 transition-colors">@inyerk__</a>
             </div>
          </div>
          <div>
             <p className="text-detail text-zinc-700 mb-8 tracking-[0.3em]">Navigation</p>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={(e) => handleNavClick(e, 'hero')} className="text-left text-sm font-bold text-zinc-500 hover:text-white uppercase transition-colors">Home</button>
                <button onClick={(e) => handleNavClick(e, 'info')} className="text-left text-sm font-bold text-zinc-500 hover:text-white uppercase transition-colors">Info</button>
                <button onClick={(e) => handleNavClick(e, 'work')} className="text-left text-sm font-bold text-zinc-500 hover:text-white uppercase transition-colors">Work</button>
                <button onClick={(e) => handleNavClick(e, 'process')} className="text-left text-sm font-bold text-zinc-500 hover:text-white uppercase transition-colors">Process</button>
             </div>
          </div>
          <div>
             <p className="text-detail text-zinc-700 mb-8 tracking-[0.3em]">Legal</p>
             <div className="flex gap-8">
                <Link to="/privacy-policy" className="text-sm font-bold text-zinc-500 hover:text-white uppercase transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-use" className="text-sm font-bold text-zinc-500 hover:text-white uppercase transition-colors">Terms of Use</Link>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-detail text-zinc-700">© 2026 NAEUI YI. ALL RIGHTS RESERVED.</p>
          <p className="text-detail text-zinc-700">DESIGN ARCHIVE</p>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const MainPage: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const { group } = useABTest();

  const handleCtaClick = () => {
    // Fix: TypeScript now recognizes amplitude property on window
    window.amplitude?.track('click_bottom_cta', { variant: group });
    onOpenModal();
  };

  return (
    <main>
      <div id="hero">
        <Hero />
      </div>
      <div id="info">
        <Info />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="process">
        <Process />
      </div>
      <div className="py-40 text-center px-6">
        {group === 'A' ? (
          <button 
            onClick={handleCtaClick}
            className="px-16 py-8 bg-white text-black text-2xl font-black uppercase tracking-[1px] rounded-full hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            ☕️ Let's coffee-chat
          </button>
        ) : (
          <button 
            onClick={handleCtaClick}
            className="px-16 py-8 bg-zinc-900 text-white border border-white/20 text-2xl font-black uppercase tracking-[1px] rounded-full hover:bg-zinc-800 transition-all transform hover:scale-105"
          >
            ☕️ Start a Conversation
          </button>
        )}
      </div>
    </main>
  );
};

const PolicyPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
    <h1 className="text-7xl font-black mb-16 uppercase tracking-tighter leading-none">{title}</h1>
    <div className="prose prose-invert max-w-none">
      <p className="text-zinc-400 text-xl leading-relaxed">내용을 넣어주세요.</p>
      {Array.from({length: 3}).map((_, i) => (
         <p key={i} className="text-zinc-700 mt-8 text-sm italic">본 문서는 예시용 텍스트입니다. 실제 서비스 오픈 전 법무 검토를 거친 약관으로 대체하시기 바랍니다.</p>
      ))}
    </div>
    <div className="mt-24">
      <Link to="/" className="inline-flex items-center gap-6 text-white text-sm font-black uppercase tracking-widest hover:gap-10 transition-all">
        <ArrowRight className="rotate-180" size={18} /> Back to Archive
      </Link>
    </div>
  </div>
);

// --- App ---

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <ABTestProvider testName="bottom_cta_design" analytics={amplitudeAdapter}>
        <div className="relative min-h-screen bg-black text-white">
          <Header onOpenModal={() => setIsModalOpen(true)} />
          
          <Routes>
            <Route path="/" element={<MainPage onOpenModal={() => setIsModalOpen(true)} />} />
            <Route path="/privacy-policy" element={<PolicyPage title="Privacy Policy" />} />
            <Route path="/terms-of-use" element={<PolicyPage title="Terms of Use" />} />
          </Routes>

          <Footer />
          <CoffeeChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </ABTestProvider>
    </HashRouter>
  );
};

export default App;
