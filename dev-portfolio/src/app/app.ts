import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

interface Skill {
  id: number;
  name: string;
  delay: number;
}

interface TechSkill {
  name: string;
  years: number;
  path: string;
  color: string;
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Methodologies';
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private platformId = inject(PLATFORM_ID);
  protected readonly title = signal('Richard Bishop Portfolio');
  currentYear = new Date();

  // Scroll detection signal
  protected readonly isScrolled = signal(false);

  // Experience data from resume
  protected readonly experience = signal<Experience[]>([
    {
      id: 1,
      title: 'Software Engineer Manager',
      company: 'SAIC',
      location: 'Reston, VA',
      period: 'October 2024 - August 2025',
      responsibilities: [
        'Leading a dynamic team to ensure consistent quality and implement efficient practices',
        'Conducting comprehensive discoveries on projects for requirements gathering and planning future work',
        'Mentoring team members to enhance skills and deliver greater value to clients',
        'Performing application analyses to formulate and present proposals for client projects',
        'Developing applications using the latest versions of Angular, HTML5, and CSS3, AWS based on Figma designs following 508 standards and WCAG protocols'
      ]
    },
    {
      id: 2,
      title: 'Sr. Frontend Developer',
      company: 'Expo Pass',
      location: 'Chicago, IL',
      period: 'September 2023 - September 2024',
      responsibilities: [
        'Engineered and implemented reusable stand-alone UI components leveraging the latest features of Angular 17, HTML5, and CSS3',
        'Conducted code reviews to uphold consistent coding practices while maintaining a well-organized codebase and providing guidance to new developers',
        'Compiled thorough documentation for consuming API endpoints and data models, facilitating the migration from a legacy AngularJS application',
        'Transformed a legacy AngularJS application into a new, redesigned Angular 17 application, including comprehensive refactoring'
      ]
    },
    {
      id: 3,
      title: 'Sr. Consultant',
      company: 'Improving',
      location: 'Minneapolis, MN',
      period: 'June 2022 - July 2023',
      responsibilities: [
        'Supported three Angular applications by adding new features, troubleshooting, and refactoring',
        'Upgraded major Angular versions across multiple applications alongside refactoring efforts',
        'Gained insights into insurance claims and processing within the entire business for United Health Group',
        'Led an Agile team executing UI development tasks in collaboration with an API developer to deliver comprehensive functionality',
        'Designed complex Angular components and integrated RESTful endpoints into the C# backend utilizing LINQ to query the MSSQL database'
      ]
    },
    {
      id: 4,
      title: 'Software Engineer',
      company: 'NASB',
      location: 'Kansas City, MO',
      period: 'February 2019 - April 2022',
      responsibilities: [
        'Conceptualized and developed an internal chat application using Angular 8 and MSSQL, and rewrote the internal loan processing application in Angular 8',
        'Authored stored procedures to extract data from the .NET service layer',
        'Leveraged SharePoint expertise to assist the business with updating web parts and workflows',
        'Utilized Report Builder to migrate SSRS reports to a new database',
        'Diagnosed application errors and coached the DEVOPS team when issues escalated',
        'Applied SCRUM methodologies in project execution'
      ]
    },
    {
      id: 5,
      title: 'SharePoint Engineer',
      company: 'DEG, a Merkle Company',
      location: 'Overland Park, KS',
      period: 'September 2014 - February 2019',
      responsibilities: [
        'Provided significant expertise in design and user experience to foster user-friendly interactions and deliver an intuitive look and feel for the National Board for Respiratory Care',
        'Administered and executed custom development within SharePoint 2010-2013 using Visual Studio, C#, JavaScript, HTML, and CSS',
        'Utilized CSOM and JSOM to interact with SharePoint programmatically',
        'Led a team of seven, including three developers, QA, BA, and PO, on multiple applications',
        'Constructed an Angular 5 product catalog that is searchable and filterable',
        'Developed three Angular 5 portals for improved business administration management'
      ]
    },
    {
      id: 6,
      title: 'Programmer/Analyst',
      company: 'Lockton Affinity',
      location: 'Overland Park, KS',
      period: 'Novemver 2011 - September 2014',
      responsibilities: [
        'Diagnosed and analyzed ASP.Net website and console application issues using C# and MS SQL',
        'Developed eCommerce sites utilizing VB.Net and ASP.Net for clients within a custom- built platform with an SQL database for dynamic content management',
        'Implemented enhancements on multiple client websites using Classic ASP, JavaScript, and jQuery',
        'Engaged proactively with team members to foster collaboration and enhance collective knowledge',
      ]
    }
  ]);

  // Skills for parallax animation
  protected readonly skills = signal<Skill[]>([
    { id: 5, name: 'AWS', delay: 3.2 },
    { id: 3, name: 'SQL', delay: 4.0 },
    { id: 2, name: 'Agile', delay: 4.8 },
    { id: 8, name: 'Angular', delay: 0 },
    { id: 1, name: 'Git', delay: 5.6 },
    { id: 7, name: 'TypeScript', delay: 0.8 },
    { id: 6, name: 'JavaScript', delay: 1.6 },
    { id: 4, name: 'C#', delay: 2.4 },
  ]);

  // Technical skills with experience and branding
  protected readonly techSkills = signal<TechSkill[]>([
    // Languages
    { name: 'TypeScript', years: 8, path: './TypeScript.svg', color: '#3178C6', category: 'Languages' },
    { name: 'JavaScript', years: 12, path: './JavaScript.svg', color: '#F7DF1E', category: 'Languages' },
    { name: 'HTML5', years: 12, path: './HTML5.svg', color: '#E34F26', category: 'Languages' },
    { name: 'CSS3', years: 12, path: './CSS3.svg', color: '#1572B6', category: 'Languages' },
    { name: 'C#', years: 10, path: './Csharp.svg', color: '#239120', category: 'Languages' },
    { name: 'SQL', years: 10, path: './Microsoft-SQL-Server.svg', color: '#4479A1', category: 'Languages' },
    
    // Frameworks
    { name: 'Angular', years: 9, path: './Angular.svg', color: '#DD0031', category: 'Frameworks' },
    { name: 'AngularJS', years: 3, path: './AngularJS.svg', color: '#DD0031', category: 'Frameworks' },
    { name: 'ASP.NET', years: 8, path: './.NET.svg', color: '#512BD4', category: 'Frameworks' },
    { name: 'React', years: 3, path: './React.svg', color: '#61DAFB', category: 'Frameworks' },
    { name: 'Bootstrap', years: 8, path: './Bootstrap.svg', color: '#7952B3', category: 'Frameworks' },
    { name: 'Material UI', years: 5, path: './Material-UI.svg', color: '#0081CB', category: 'Frameworks' },
    { name: 'RxJS', years: 6, path: './RxJs.png', color: '#B7178C', category: 'Frameworks' },
    
    // Tools
    { name: 'Visual Studio', years: 10, path: './Visual-Studio.svg', color: '#5C2D91', category: 'Tools' },
    { name: 'VS Code', years: 8, path: './Visual-Studio-Code-(VS-Code).svg', color: '#007ACC', category: 'Tools' },
    { name: 'Git', years: 10, path: './Git.svg', color: '#F05032', category: 'Tools' },
    { name: 'AWS', years: 4, path: './AWS.svg', color: '#FF9900', category: 'Tools' },
    { name: 'Figma', years: 3, path: './Figma.svg', color: '#F24E1E', category: 'Tools' },
    { name: 'Postman', years: 6, path: './Postman.svg', color: '#FF6C37', category: 'Tools' },
    
    // Methodologies
    { name: 'Agile, SCRUM', years: 10, path: './Agile.png', color: '#0052CC', category: 'Methodologies' },
    { name: 'Kanban', years: 6, path: './Kanban.png', color: '#0079BF', category: 'Methodologies' },
    { name: 'WCAG', years: 4, path: './WCAG.jpg', color: '#005A9C', category: 'Methodologies' },
    { name: '508 Standards', years: 2, path: './508.png', color: '#2E3440', category: 'Methodologies' }
  ]);

  // Portfolio projects
  protected readonly portfolio = signal<Project[]>([
    {
      id: 1,
      title: 'RAG Chatbot',
      description: 'Built a chatbot component in Angular 19 that utilized a Python with AWS Bedrock middle-layer along with vector database. Part of a team effort to create an MVP in 8 hours along with a presentation for a tech challenge competing for a contract.',
      technologies: ['Angular 19', 'Python', 'AWS Bedrock', 'Vector Database'],
      highlights: [
        'MVP delivered in 8 hours',
        'Team collaboration for tech challenge',
        'Integration with AWS Bedrock AI services'
      ]
    },
    {
      id: 2,
      title: 'Claim Management Application',
      description: 'Worked on an internal claim management application for out-of-network cases. The Angular 15 frontend was supported by MSSQL database and C# backend layer.',
      technologies: ['Angular 15', 'C#', 'MSSQL', 'REST APIs', 'LINQ'],
      highlights: [
        'Dashboard-style interface for claim processing',
        'End-to-end claim workflow management',
        'Data-driven web application design'
      ]
    },
    {
      id: 3,
      title: 'Internal Chat Application',
      description: 'Designed and developed a communication application with Angular 8 and MSSQL. The application allows users to enter messages on specific loans with the ability to mention others or use keywords.',
      technologies: ['Angular 8', 'MSSQL', 'Real-time messaging'],
      highlights: [
        'Real-time messaging with notifications',
        'User mention system with keywords',
        'Document attachment capabilities',
        'Advanced search and filter functionality'
      ]
    },
    {
      id: 4,
      title: 'File Converter Application',
      description: 'Created a C#.Net web application for altering files received from clients to comply with a desired format that achieved 99% reduction on time spent manually editing them.',
      technologies: ['C#.NET', 'Oracle Database', 'APIs', 'Multiple File Formats'],
      highlights: [
        '99% reduction in manual editing time',
        'Support for multiple file extensions',
        'Oracle database integration via API',
        'Automated file format compliance'
      ]
    }
  ]);

  // Get skills by category
  protected getSkillsByCategory(category: string): TechSkill[] {
    return this.techSkills().filter(skill => skill.category === category);
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Add scroll listener for sticky navigation
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 100);
        this.handleScrollAnimations();
      });

      // Initial animation check
      setTimeout(() => this.handleScrollAnimations(), 100);
    }
  }

  // Handle scroll-based animations
  private handleScrollAnimations(): void {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;
      
      if (isVisible && !section.classList.contains('animate')) {
        section.classList.add('animate');
        
        // Trigger counter animations for about section
        if (section.id === 'about') {
          this.animateCounters();
        }
      }
    });
  }

  // Animate counter values
  private animateCounters(): void {
    const counters = [
      { element: '.years-experience .stat-number', target: 12, suffix: '+' },
      { element: '.years-leading .stat-number', target: 3, suffix: '+' },
      { element: '.certifications-count .stat-number', target: 4, suffix: '' }
    ];

    counters.forEach(counter => {
      const element = document.querySelector(counter.element) as HTMLElement;
      if (element && !element.classList.contains('animated')) {
        element.classList.add('animated');
        this.countUp(element, counter.target, counter.suffix);
      }
    });
  }

  // Count up animation
  private countUp(element: HTMLElement, target: number, suffix: string): void {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, stepTime);
  }

  // Smooth scroll to section
  protected scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}
