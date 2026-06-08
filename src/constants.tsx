import React from 'react';
import { Profile, Education, Experience, Project, SkillCategory } from './types';
import { 
  Code2, 
  Database, 
  Layout, 
  Terminal, 
  Brain, 
  Cpu,
  Trophy,
  Users
} from 'lucide-react';

export const PROFILE: Profile = {
  name: "Ahmed Nasser Mohammed",
  title: "Full-Stack TypeScript & AI Systems Engineer",
  tagline: "Building robust, scalable software architectures by combining deep systems-level knowledge with bleeding-edge AI orchestration.",
  contact: {
    email: "ahmed.naser732006@gmail.com",
    phone: "+201009784937",
    location: "Alexandria, Egypt",
    linkedin: "https://www.linkedin.com/in/ahmed-naser-a9556a255/",
    github: "https://github.com" // Placeholder based on CV implication
  }
};

export const BIO = {
  heading: "The Spark",
  content: "I am a research driven developer building robust, scalable software architectures by combining deep systems-level knowledge (C/C++) with bleeding-edge AI orchestration. By leveraging advanced AI stacks (Cursor, v0, MCP, Qodo, Coderabbit, Jules, openclaw, Antigravity) and defining massive, highly constrained system contexts (135+ pages), I accelerate development cycles and prevent technical debt. I bridge the gap between low-level performance and high-level architectural design.",
  stats: [
    { label: "LeetCode Problems", value: "300+", link: "https://leetcode.com/u/notSonNormalID/" },
    { label: "CodeForces Problems", value: "100+", link: "https://codeforces.com/profile/Fdgfuff" }
  ]
};

export const EDUCATION: Education = {
  institution: "Pharos University",
  degree: "BSc of Computer Science (Fully Funded Scholarship)",
  year: "2023 - 2027",
  details: ["GPA: 3.7"]
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Full-Stack Architect",
    organization: "Independent Projects",
    period: "2023 - Present",
    type: "work",
    description: "Architecting highly constrained AI environments and engineering complex systems from scratch.",
    achievements: [
      "Large-Context AI Orchestration: Architected highly constrained AI environments by developing comprehensive system-level context definitions (routinely exceeding 135+ pages of logic, edge cases, and tech stack rules).",
      "Risk Mitigation & Delivery: Drastically reduced Lead Time for Changes (DORA metrics) and eliminated scope creep before execution by ensuring complete architectural alignment prior to AI-assisted code generation.",
      "Systems Development: Engineered and deployed complex systems from scratch, including a secure, end-to-end Driver’s License Management System, focusing on strict data integrity and scalable backend architecture."
    ]
  },
  {
    role: "President & Head of Trainers Committee",
    organization: "ICPC PUA",
    period: "2025 - Present",
    type: "activity",
    description: "Leading and mentoring top-tier algorithmic problem solvers.",
    achievements: [
      "Algorithmic Leadership: Lead and mentor top-tier algorithmic problem solvers (personally completed 300+ LeetCode, 100+ CodeForces problems).",
      "Performance Optimization: Focus heavily on extreme code efficiency, time complexity analysis, and execution under pressure—translating directly to optimized, low-latency production code.",
      "Achievement: Secured 1st place in university ranking at ACM ECPC 2025."
    ]
  },
  {
    role: "International Ambassador",
    organization: "IEEE Yesist",
    period: "2024 - Present",
    type: "activity",
    description: "Representing cutting-edge technical innovation on a global scale.",
    achievements: [
      "Represented cutting-edge technical innovation on a global scale, bridging the gap between academic research and commercial engineering applications."
    ]
  },
  {
    role: "AI Systems Trainer & Evaluator",
    organization: "Outlier & DataAnnotation",
    period: "2023 - 2024",
    type: "work",
    description: "Training and refining advanced AI models on complex software engineering concepts.",
    achievements: [
      "Algorithmic Fine-Tuning: Trained and fine-tuned advanced AI models (Claude 3.5, GPT-4o) on complex software engineering concepts, reasoning, and algorithmic problem-solving.",
      "Code Optimization: Evaluated and optimized AI-generated code across various tech stacks, gaining deep, proprietary insights into human-like behavior modeling and AI development constraints.",
      "Architectural Refinement: Refined LLM responses for architectural robustness and logical accuracy, directly enhancing the models' utility for enterprise-level software development."
    ]
  },
  {
    role: "AI Engineer Trainee",
    organization: "Arabian Academy AI Diploma",
    period: "2025",
    type: "activity",
    description: "Full AI/ML training program focused on hands-on experience.",
    achievements: [
      "Efficient use of all kinds of AI/ML models starting from KNN to LLM.",
      "Gained full right to call myself an AI/ML engineer."
    ]
  },
  {
    role: "Leader & Founder",
    organization: "ITI's InnovEgypt Program",
    period: "2024",
    type: "activity",
    description: "Completed startup and business training program.",
    achievements: [
      "Founded and led a team startup project.",
      "Handled conflict resolution, task organization, and backup planning for team members."
    ]
  },
  {
    role: "Trainee",
    organization: "NTI Web-Design and Personal Branding Diploma",
    period: "2024",
    type: "activity",
    description: "A dense 100 hour web interface development bootcamp.",
    achievements: [
      "Became fully comfortable with HTML, CSS, JS, BOOTSTRAP.",
      "Gained knowledge needed to fully market for my skills and services."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "ICPC PUA Platform",
    category: "Competitive Programming",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    description: "Official platform for the ICPC Pharos University in Alexandria community, featuring leaderboards, resources, and event tracking.",
    highlights: ["Real-time leaderboards", "Resource management", "Event tracking"],
    link: "https://icpcpua.netlify.app/",
    bentoSize: "large"
  },
  {
    title: "Share Ideas KSA",
    category: "Corporate Platform",
    tech: ["Next.js", "React", "Node.js"],
    description: "A professional corporate platform for Share Ideas KSA, focusing on clean UI/UX and robust content delivery.",
    highlights: ["Corporate branding", "Content management", "Responsive design"],
    link: "https://shareideasksa.com/",
    bentoSize: "wide"
  },
  {
    title: "Ehab Admin Dashboard",
    category: "Internal Tools",
    tech: ["React", "Admin Panel", "API Integration"],
    description: "Comprehensive administrative dashboard for managing business operations, users, and analytics.",
    highlights: ["Data visualization", "User management", "Secure authentication"],
    link: "https://ehab-adminbcad.vercel.app/",
    bentoSize: "tall"
  },
  {
    title: "Live Star Agency",
    category: "Creative Portfolio",
    tech: ["React", "Framer Motion", "Tailwind"],
    description: "Interactive and highly animated portfolio for a creative agency or individual.",
    highlights: ["Smooth animations", "Creative layout", "Performance optimized"],
    link: "https://livestar.agency",
    bentoSize: "small"
  },
  {
    title: "Astro Presentation",
    category: "Web Presentation",
    tech: ["Astro", "React", "CSS"],
    description: "A blazing fast, slide-based web presentation built with Astro for optimal performance.",
    highlights: ["Static site generation", "Slide transitions", "Markdown support"],
    link: "https://astro-presentation-gules.vercel.app/",
    bentoSize: "small"
  },
  {
    title: "Lamees Nasser Portfolio",
    category: "Personal Brand",
    tech: ["React", "CSS", "Vite"],
    description: "Elegant personal portfolio website designed to showcase projects and professional experience.",
    highlights: ["Minimalist design", "Project gallery", "Contact form"],
    link: "https://lamees-nasser.vercel.app/",
    bentoSize: "tall"
  },

  {
    title: "Finals QB",
    category: "Education Platform",
    tech: ["React", "Web"],
    description: "A comprehensive question bank platform designed to help students prepare for their final exams effectively.",
    highlights: ["Question banks", "Exam preparation", "User-friendly interface"],
    link: "https://finals-qb.vercel.app/",
    bentoSize: "small"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Full-Stack Engineering",
    skills: ["TypeScript", "React/Next.js", "Node.js", "PostgreSQL/MongoDB", "Supabase", "C/C++", "C#", "Python", "T-SQL", ".NET", "ADO.Net"],
    iconName: "Code2"
  },
  {
    name: "AI-Augmented Architecture",
    skills: ["Large-Context AI Orchestration", "Cursor", "v0", "MCP", "Qodo", "CodeRabbit", "Google Stitch", "Speckit", "Jules"],
    iconName: "Brain"
  },
  {
    name: "Systems & Performance",
    skills: ["C++ Memory Management", "Algorithmic Optimization", "Low-Latency Execution", "Automated DOM Querying"],
    iconName: "Cpu"
  },
  {
    name: "Technical Business Consulting",
    skills: ["ROI & TCO Analysis", "Technical Feasibility Studies", "Scope of Work (SOW) Constraints", "Client Negotiation"],
    iconName: "Users"
  }
];

export const AWARDS = [
  {
    title: "1st Place - ACM ECPC Qualifications",
    organization: "Egyptian Collegiate Programming Contest",
    year: "2025",
    description: "Secured 1st place at University ranking. Assisted team with study materials and advanced algorithm problem solving."
  }
];

export const GITHUB_PROJECTS: Project[] = [
  {
    title: "DVLD Licensing System",
    category: "Systems & Security",
    tech: ["C#", ".NET 4.7", "SQL Server", "T-SQL", "WinForms", "ADO.NET", "Windows Logging"],
    description: "A comprehensive, high-integrity Driver and Vehicle Licensing Department platform. Manages 10+ core administrative licensing workflows (from vision tests and theory exams to international permits) with strict transactional safety.",
    highlights: ["10+ Administrative Workflows", "Transactional ACID Safety", "Custom Data Access layer", "Three-Tier Architecture"],
    link: "https://github.com/AhmedNasser-bug/DVLD-System-Project"
  },
  {
    title: "Algorithm Analysis",
    category: "Data Structures & Benchmarking",
    tech: ["C#", ".NET Framework", "Windows Forms GUI", "Multiprogramming & Threads", "Performance Profiling"],
    description: "A desktop application for analyzing and visualizing algorithm performance through an intuitive GUI, running custom benchmarks on different dataset sizes.",
    highlights: ["Interactive GUI Step Execution", "Custom Performance Benchmarking", "Data Size Efficiency Comparison", "Extensible Algorithm Registry"],
    link: "https://github.com/AhmedNasser-bug/Algorithm-Analysis"
  },
  {
    title: "Algorithmic Game Solver",
    category: "Artificial Intelligence & Search",
    tech: ["Python", "Tkinter", "CustomTkinter", "Graph Algorithms", "Heuristic Search Models"],
    description: "Python-based system utilizing reusable pathfinding search algorithms (DLS, BFS, IDDFS, HillClimb) to solve Sudoku, 8-Queens, and Maze games via a unified Graph state interface.",
    highlights: ["Sudoku Graph Solver (BFS)", "8-Queens Board Search", "Maze Pathfinding Visualization", "Unified Graph Search Interface"],
    link: "https://github.com/AhmedNasser-bug/Algorithmic-Game-solver"
  }
];