import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DropdownComponent, DropdownItem } from './components/dropdown';

@Component({
  selector: 'app-root',
  imports: [CommonModule, DatePipe, RouterModule, DropdownComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  protected readonly title = signal('Richard Bishop Portfolio');

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
