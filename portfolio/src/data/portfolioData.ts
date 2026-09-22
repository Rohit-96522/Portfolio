export interface Project {
  id: string
  number: string
  title: string
  description: string
  problemSolved: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  status?: string
}

export interface TechnologyItem {
  name: string
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Tools'
}

export interface Certification {
  id: string
  issuer: string
  title: string
  year: string
  credentialUrl?: string
}

export interface SocialLinks {
  github: string
  githubUsername: string
  linkedin: string
  leetcode: string
  codechef?: string
  email?: string
}

export interface PortfolioData {
  personal: {
    name: string
    shortName: string
    title: string
    headline: string
    bio: string
    educationBadge: string
    institution: string
  }
  social: SocialLinks
  technologies: {
    languages: string[]
    frontend: string[]
    backend: string[]
    databases: string[]
    tools: string[]
  }
  projects: Project[]
  certifications: Certification[]
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Ponnana Rohit',
    shortName: 'PR',
    title: 'Computer Science Student',
    headline: 'Computer Science Student building intelligent and real-world software.',
    bio: 'B.Tech CSE student focused on AI, backend systems, and full-stack development.',
    educationBadge: 'B.Tech CSE · VFSTR',
    institution: "Vignan's Foundation for Science, Technology & Research (VFSTR)",
  },

  social: {
    github: 'https://github.com/Rohit-96522',
    githubUsername: 'Rohit-96522',
    linkedin: 'https://www.linkedin.com/in/ponnana-rohit-026b7a350/',
    leetcode: 'https://leetcode.com/u/ponnanarohit/',
    // Configurable placeholders
    codechef: '', // Add CodeChef username or URL here if available
    email: '', // Add email (e.g. 'mailto:your.email@example.com') if desired
  },

  technologies: {
    languages: ['C', 'Python', 'Java', 'JavaScript'],
    frontend: ['HTML', 'CSS', 'React', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js'],
    databases: ['MySQL', 'MongoDB', 'PostgreSQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },

  projects: [
    {
      id: 'pds-slot-management',
      number: '01',
      title: 'PDS Slot Management System',
      description:
        'A digital slot booking and ration distribution management system designed to reduce queues, improve transparency, and simplify ration distribution.',
      problemSolved:
        'Addresses overcrowding and arbitrary waiting times at Public Distribution System outlets by allowing beneficiaries to schedule pickup slots, verifying quotas systematically, and improving operational transparency.',
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      githubUrl: 'https://github.com/Rohit-96522',
      liveUrl: '',
      status: 'Completed',
    },
    {
      id: 'pro-audit',
      number: '02',
      title: 'Pro Audit',
      description:
        'An AI-powered procurement intelligence system focused on document analysis, auditing, and intelligent procurement workflows.',
      problemSolved:
        'Automates time-consuming procurement audits by parsing unstructured PDF documents, detecting pricing deviations against contracts, and applying LLM-driven intelligence to flag compliance anomalies.',
      technologies: ['Python', 'Flask', 'React', 'LLM APIs', 'PDF Parsing', 'REST API'],
      githubUrl: 'https://github.com/Rohit-96522',
      liveUrl: '',
      status: 'Active',
    },
    {
      id: 'crop-residue-marketplace',
      number: '03',
      title: 'Crop Residue Marketplace',
      description:
        'A platform connecting farmers, buyers, and logistics providers for agricultural crop-residue management and marketplace workflows.',
      problemSolved:
        'Tackles seasonal stubble burning by creating a commercial channel where farmers monetize agricultural waste, industrial buyers procure biomass, and logistics operators fulfill hauling contracts in real time.',
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'MongoDB / PostgreSQL',
        'Firebase',
        'Cloudinary',
        'Socket.io',
      ],
      githubUrl: 'https://github.com/Rohit-96522',
      liveUrl: '',
      status: 'Active',
    },
  ],

  certifications: [
    {
      id: 'nptel-python-ds',
      issuer: 'NPTEL',
      title: 'Python for Data Science',
      year: '2024',
      credentialUrl: '',
    },
    {
      id: 'nptel-analytics-r',
      issuer: 'NPTEL',
      title: 'Business Analytics and Data Mining Modeling using R',
      year: '2024',
      credentialUrl: '',
    },
  ],
}
