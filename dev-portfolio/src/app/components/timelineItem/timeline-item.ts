import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="job-header">
          <h3 class="job-title">{{ job.title }}</h3>
          <div class="job-company">{{ job.company }}</div>
          <div class="job-period">{{ job.period }}</div>
          <div class="job-location">{{ job.location }}</div>
        </div>
        <ul class="job-responsibilities">
          @for (responsibility of job.responsibilities; track responsibility) {
            <li>{{ responsibility }}</li>
          }
        </ul>
      </div>
    </div>
  `,
  styleUrl: './timeline-item.scss'
})
export class TimelineItemComponent {
  @Input({ required: true }) job!: Experience;
}