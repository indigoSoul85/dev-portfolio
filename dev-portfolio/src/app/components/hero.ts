import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="hero-greeting">Hello, I'm</span>
            <span class="hero-name">Richard Bishop</span>
          </h1>
          <h2 class="hero-subtitle">Senior Software Engineer & Technical Leader</h2>
          <p class="hero-description">
            Experienced Software Engineer with over 3+ years of experience in leading teams and 12+ years
            delivering high-quality web applications via SCRUM and Agile methodologies.
            Proven expertise in Angular, TypeScript, and full-stack development. I am
            embracing the AI phase of software and utilize it for higher productivity
            and creative assistance.
          </p>
          <div class="hero-actions">
            <button (click)="scrollToSection('portfolio')" class="btn-primary" aria-label="Navigate to portfolio section">View My Work</button>
            <button (click)="scrollToSection('contact')" class="btn-secondary" aria-label="Navigate to contact section">Get In Touch</button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-avatar">
            <div class="avatar-ring"></div>
            <div class="avatar-content">
              <img src="pro-me.jpeg" alt="Richard Bishop - Senior Software Engineer" class="avatar-image" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.scss'
})
export class HeroComponent {
  private platformId = inject(PLATFORM_ID);

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