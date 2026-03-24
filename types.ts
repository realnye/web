
export enum ProjectCategory {
  UXUI = 'UX/UI Design',
  Graphic = 'Graphic Design',
  Space = 'Space Design'
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  role: string;
  keyPoints: string;
  link: string;
  imageUrl: string;
  subImages?: string[];
  contributions?: string[];
  description?: string;
  details?: string[];
}

export interface Experience {
  period: string;
  company: string;
  role: string;
  description: string;
}

export interface DesignStack {
  category: string;
  items: string[];
}
