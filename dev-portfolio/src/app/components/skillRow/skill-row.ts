import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechSkill } from '../../models';

@Component({
  selector: 'app-skill-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skill-row">
      <div class="skill-info">
        <img class="skill-icon" [src]="skill.path" [alt]="skill.name + ' logo'" />
        <span class="skill-name">{{ skill.name }}</span>
      </div>
      <div class="skill-experience">
        <span class="experience-years">{{ skill.years }}+ years</span>
        <div class="experience-bar">
          <div class="experience-fill"
               [style.width]="(skill.years / maxYears * 100) + '%'"
               [style.background-color]="skill.color">
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './skill-row.scss'
})
export class SkillRowComponent {
  @Input({ required: true }) skill!: TechSkill;
  @Input() maxYears: number = 12; // Default max years for percentage calculation
}