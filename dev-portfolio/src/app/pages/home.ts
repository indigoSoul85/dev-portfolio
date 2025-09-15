import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Experience, Skill, TechSkill, Project } from '../models';
import { EXPERIENCE_DATA, SKILLS_DATA, TECH_SKILLS_DATA, PORTFOLIO_DATA } from '../shared/my-data';
import { HeroComponent } from '../components/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, HeroComponent],
  templateUrl: './home.html',
  styleUrl: '../app.scss'
})
export class HomeComponent {
  private platformId = inject(PLATFORM_ID);
  currentYear = new Date();

  // Experience data from resume
  protected readonly experience = signal<Experience[]>(EXPERIENCE_DATA);

  // Skills for parallax animation
  protected readonly skills = signal<Skill[]>(SKILLS_DATA);

  // Technical skills with experience and branding
  protected readonly techSkills = signal<TechSkill[]>(TECH_SKILLS_DATA);

  // Portfolio projects
  protected readonly portfolio = signal<Project[]>(PORTFOLIO_DATA);

  // Get skills by category
  protected getSkillsByCategory(category: string): TechSkill[] {
    return this.techSkills().filter(skill => skill.category === category);
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Add scroll listener for sticky navigation
      window.addEventListener('scroll', () => {
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