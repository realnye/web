import { Project, ProjectCategory, Experience, DesignStack } from './types';

export const PROJECTS: Project[] = [
  // Category 1. UX/UI Design
  {
    id: 'ux-1',
    category: ProjectCategory.UXUI,
    title: '[Do-It] 룸메이트 매칭 서비스',
    role: 'UX기획·UI시스템',
    keyPoints: '사용자 피드백 기반 UX 개선',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ux-2',
    category: ProjectCategory.UXUI,
    title: '[Do-It] 일정 루틴 관리 앱',
    role: 'GUI 디자인',
    keyPoints: '유저 데이터 기반 인터렉션 설계',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ux-3',
    category: ProjectCategory.UXUI,
    title: '[SDP] 유휴공간 텃밭 서비스',
    role: 'UX 리서치·기획',
    keyPoints: '사회적 가치와 UX의 결합',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ux-4',
    category: ProjectCategory.UXUI,
    title: '[CJINV] 블록체인 프로덕트',
    role: 'UI/UX 디자인',
    keyPoints: '복잡한 기술의 시각적 단순화',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop'
  },
  // Category 2. Graphic Design
  {
    id: 'gr-1',
    category: ProjectCategory.Graphic,
    title: '[SDP] 정기 전시 브랜딩',
    role: 'BX 디자인',
    keyPoints: '컨셉의 시각적 메타포 구현',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'gr-2',
    category: ProjectCategory.Graphic,
    title: '[MUH] 브랜드 캠페인',
    role: '마케팅 디자인',
    keyPoints: '타겟 맞춤형 비주얼 커뮤니케이션',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'gr-3',
    category: ProjectCategory.Graphic,
    title: '[Personal] 아트워크 시리즈',
    role: '그래픽 디자인',
    keyPoints: '타이포그래피와 레이아웃 실험',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'gr-4',
    category: ProjectCategory.Graphic,
    title: '[Brand] 아이덴티티 구축',
    role: 'CI/BI 디자인',
    keyPoints: '브랜드 가이드라인 수립',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop'
  },
  // Category 3. Space Design
  {
    id: 'sp-1',
    category: ProjectCategory.Space,
    title: '[Spatial] 경험 중심 팝업스토어',
    role: '공간 기획·3D',
    keyPoints: '사용자 동선 시뮬레이션',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sp-2',
    category: ProjectCategory.Space,
    title: '[Concept] 도심 속 휴식 공간',
    role: '모델링·렌더링',
    keyPoints: '물리적 환경의 UX 설계',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sp-3',
    category: ProjectCategory.Space,
    title: '[Exhibition] 전시 공간 레이아웃',
    role: '공간 연출',
    keyPoints: '매체와 공간의 유기적 연결',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sp-4',
    category: ProjectCategory.Space,
    title: '[Interior] 미니멀리즘 오피스',
    role: '공간 설계',
    keyPoints: '효율성과 심미성의 균형',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    period: '2025. 08 - Present',
    company: 'CJINV',
    role: 'UXUI Designer',
    description: 'Web3 기반 인터페이스 표준 설계 및 사용자 경험 고도화'
  },
  {
    period: '2022. 03 - 2022. 09',
    company: 'MUH Cosmetic',
    role: 'Brand Experience Design Intern',
    description: '커머스 전환율 최적화를 위한 마케팅 비주얼 및 브랜드 에셋 구축'
  },
  {
    period: 'Ongoing',
    company: "IT 연합 동아리 'Do-It'",
    role: 'Designer Lead',
    description: '교내 기숙사 타겟 룸메이트 매칭 앱 & 대학생 일정 루틴 앱 개발 협업 및 런칭'
  },
  {
    period: 'Ongoing',
    company: 'SDP 지속가능발전 학회',
    role: '16기 디자인팀',
    description: "UX 리서치 기반 '도시 유휴공간 텃밭 앱' 기획 및 디자인"
  }
];

export const STACKS: DesignStack[] = [
  { category: 'Interface', items: ['Figma', 'ProtoPie'] },
  { category: 'Visual', items: ['Ps', 'Ai', 'Id', 'Ae'] },
  { category: 'Spatial', items: ['Rhino', 'SketchUp', 'Enscape'] }
];
