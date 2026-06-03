export interface Profile {
  name: string;
  title: string;
  tagline: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  details: string[];
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
  type: "work" | "activity";
}

export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string;
  highlights: string[];
  link?: string;
  bentoSize?: 'large' | 'wide' | 'tall' | 'small';
}

export interface SkillCategory {
  name: string;
  skills: string[];
  iconName: string;
}
