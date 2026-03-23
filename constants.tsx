import { Project, ProjectCategory, Experience, DesignStack } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'housewith',
    category: ProjectCategory.UXUI,
    title: 'Housewith',
    role: 'PM · Product Designer',
    keyPoints: '룸메이트 매칭 플랫폼',
    link: '#',
    imageUrl: 'housewith_1.png', // 룸메이트 매칭 플랫폼 이미지
    description: '잘 맞는 룸메를 위한 기숙사 룸메이트 매칭 플랫폼입니다. 정보 부족과 판단의 어려움을 해결하여 사용자가 직접 탐색하고 선택할 수 있는 구조를 제공합니다.',
    details: [
      '사용자 성향 설문 기반의 데이터화 및 간결한 온보딩 시스템 설계',
      '조건 필터 기반 검색 기능 및 통일된 양식의 프로필 구조 제공',
      '방장/멤버 관점에 맞춘 정보 분리 및 매칭 프로세스 관리 시스템',
      '상호 간 매칭 신뢰도를 높이는 피드백 및 활동 내역 관리 시스템 구축'
    ]
  },
  {
    id: 'dental-u',
    category: ProjectCategory.UXUI,
    title: 'Dental U (덴탈유)',
    role: 'UXUI Designer',
    keyPoints: '내 손안의 치아관리 서비스',
    link: '#',
    imageUrl: 'dentalu_2.png', // Dental theme
    subImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop', // IA/Medical
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop'  // Home/App
    ],
    description: '의료진과 환자 간의 상호작용에 대한 해결책을 제시하는 치아 관리 서비스입니다. 환자의 불안감을 완화하고 진료 전 필요한 정보를 한눈에 제공합니다.',
    details: [
      '환자 모니터링 개선 및 긍정적인 진료 경험을 위한 정보 구조(IA) 설계',
      '필수 정보만을 선별하여 구성한 홈 화면 및 실시간 대기 현황 확인 기능',
      '진료 내역 상세 확인 및 시각화된 만족도 조사 시스템 구현',
      '시술 과정 브리핑 및 진료 방식에 대한 사전 지식 제공 가이드 구축'
    ]
  },
  {
    id: 'routie',
    category: ProjectCategory.UXUI,
    title: 'Routie (루티)',
    role: 'PM · Product Designer',
    keyPoints: '대학생활 일정 루틴 관리',
    link: '#',
    imageUrl: 'routie_3.png', // Planner theme
    subImages: [
      'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop', // Visual Identity
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop'  // Calendar
    ],
    description: '학업, 대외활동, 자기관리를 병행하는 대학생들을 위한 일정 및 루틴 관리 솔루션입니다. 효율적이고 체계적인 시간 관리를 제안합니다.',
    details: [
      '루틴과 일정 탭 전환을 통한 시간대별 할 일 및 고정 스케줄 통합 관리',
      '게이미피케이션 요소를 활용한 캐릭터 성장 시스템 및 동기부여 설계',
      '매달 루틴 달성도와 시간대별 루틴을 한눈에 확인하는 캘린더 인터페이스',
      '사용자 활동 데이터 기반의 피드백 대시보드 및 커스터마이징 기능'
    ]
  },
  {
    id: 'furzzle',
    category: ProjectCategory.UXUI,
    title: 'Furzzle (퍼즐)',
    role: 'UXUI Designer',
    keyPoints: '습관 형성 및 관리 서비스',
    link: '#',
    imageUrl: 'furzzle_4.png', // Green/Habit theme
    subImages: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop', // Define/Habit
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop'  // Main/Activity
    ],
    description: '간편한 기록 방식과 개인 맞춤형 알림으로 지속 가능한 습관 형성을 돕는 서비스입니다. 개인화된 콘텐츠 제공을 통해 습관 유지를 유도합니다.',
    details: [
      '심층 인터뷰를 통한 페인포인트 분석 및 "개인화된 콘텐츠 제공" 솔루션 도출',
      '주간/월간 습관 트래킹 및 달성률 시각화를 통한 성취감 고취',
      '맞춤 필터 기반의 운동 영상 큐레이션 및 보이스 코칭 피트니스 기능',
      '작은 성공을 유도하는 챌린지 시스템 및 활동 내역 관리 인터페이스 설계'
    ]
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
