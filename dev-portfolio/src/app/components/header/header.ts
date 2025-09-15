import { Component, signal, inject, PLATFORM_ID, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DropdownComponent, DropdownItem } from '../dropdown';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <nav class="nav-container">
        <div class="logo">
          <span class="logo-text">RB</span>
        </div>
        <ul class="nav-menu">
          <li><a routerLink="/" class="nav-link" aria-label="Navigate to home">Home</a></li>
          <li><a (click)="scrollToSection('about')" class="nav-link" aria-label="Navigate to about section">About</a></li>
          <li><a (click)="scrollToSection('experience')" class="nav-link" aria-label="Navigate to experience section">Experience</a></li>
          <li><a (click)="scrollToSection('skills')" class="nav-link" aria-label="Navigate to skills section">Skills</a></li>
          <li><a (click)="scrollToSection('portfolio')" class="nav-link" aria-label="Navigate to portfolio section">Portfolio</a></li>
          <li>
            <app-dropdown
              label="Demos"
              [items]="demosDropdownItems">
            </app-dropdown>
          </li>
          <li><a (click)="scrollToSection('contact')" class="nav-link" aria-label="Navigate to contact section">Contact</a></li>
        </ul>
      </nav>
    </header>
  `,
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  // Scroll detection signal
  protected readonly isScrolled = signal(false);

  // Dropdown items for the Demos menu
  protected readonly demosDropdownItems: DropdownItem[] = [
    { label: 'D3 Demo', routerLink: '/d3-demo' },
    { label: 'Chat Bot', routerLink: '/chat-bot' }
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Add scroll listener for sticky navigation
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 100);
      });
    }
  }

  // Smooth scroll to section (for navigation within home page)
  protected scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // If not on home page, navigate to home first then scroll
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 100);
        });
      } else {
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
}