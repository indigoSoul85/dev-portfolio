import { Component, Input, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface DropdownItem {
  label: string;
  routerLink?: string;
  onClick?: () => void;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dropdown" [class.open]="isOpen()">
      <button
        class="dropdown-toggle nav-link"
        (click)="toggle()"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="true"
        type="button"
      >
        {{ label }}
        <svg 
          class="dropdown-arrow" 
          [class.rotated]="isOpen()"
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      <div class="dropdown-menu" [class.show]="isOpen()">
        @for (item of items; track item.label) {
          @if (item.routerLink) {
            <a 
              class="dropdown-item" 
              [routerLink]="item.routerLink"
              (click)="selectItem(item)"
            >
              {{ item.label }}
            </a>
          } @else {
            <button 
              class="dropdown-item" 
              type="button"
              (click)="selectItem(item)"
            >
              {{ item.label }}
            </button>
          }
        }
      </div>
    </div>
  `,
  styleUrls: ['./dropdown.scss']
})
export class DropdownComponent {
  @Input() label: string = 'Dropdown';
  @Input() items: DropdownItem[] = [];
  
  protected readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.set(!this.isOpen());
  }

  selectItem(item: DropdownItem): void {
    if (item.onClick) {
      item.onClick();
    }
    this.close();
  }

  close(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown');
    if (!dropdown) {
      this.close();
    }
  }
}