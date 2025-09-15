import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="project-card">
      <div class="project-header">
        <h3 class="project-title">{{ project.title }}</h3>
        <div class="project-tech">
          @for (tech of project.technologies; track tech) {
            <span class="tech-tag">{{ tech }}</span>
          }
        </div>
      </div>
      <p class="project-description">{{ project.description }}</p>
      @if (project.highlights.length > 0) {
        <ul class="project-highlights">
          @for (highlight of project.highlights; track highlight) {
            <li>{{ highlight }}</li>
          }
        </ul>
      }
    </div>
  `,
  styleUrl: './project-card.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}