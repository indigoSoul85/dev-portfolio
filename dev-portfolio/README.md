# DevPortfolio

A modern, responsive portfolio website built with Angular 20+ featuring a clean component architecture, lazy loading, and interactive demos.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Features

- **Modern Angular Architecture**: Built with Angular 20+ using standalone components
- **Lazy Loading**: Route-based code splitting for optimal performance
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Interactive Demos**: D3.js chart demo and chat bot interface
- **Component-Based**: Modular, reusable components with proper encapsulation
- **TypeScript**: Fully typed with interfaces and models
- **SCSS Styling**: Modular styling with CSS custom properties

## Project Structure

```
src/app/
├── components/           # Reusable UI components
│   ├── header/          # Navigation header component
│   ├── hero/            # Hero section component
│   ├── projectCard/     # Project card component
│   ├── skillRow/        # Skill row component
│   └── timelineItem/    # Timeline item component
├── models/              # TypeScript interfaces
│   ├── experience.model.ts
│   ├── project.model.ts
│   ├── skill.model.ts
│   └── tech-skill.model.ts
├── pages/               # Page components
│   ├── home.ts/html     # Main portfolio page
│   ├── d3-demo.ts       # D3.js chart demonstration
│   └── chat-bot.ts      # AI chat bot demo
├── shared/              # Shared utilities and data
│   └── my-data.ts       # Mock data constants
└── app.routes.ts        # Lazy-loaded routing configuration
```

## Recent Updates

### Component Architecture Refactoring
- **Header Component**: Extracted navigation header with scroll detection and smooth scrolling
- **Hero Component**: Standalone hero section with responsive design
- **Timeline Component**: Reusable timeline item for experience display
- **Skill Row Component**: Modular skill display with progress indicators
- **Project Card Component**: Reusable project showcase cards with hover effects

### Code Organization
- **Models Extraction**: Separated TypeScript interfaces into dedicated model files
- **Data Separation**: Moved mock data to shared directory for better maintainability
- **Component Isolation**: Each component has its own folder with styles and barrel exports
- **Lazy Loading**: Implemented route-based code splitting for better performance

### Visual Enhancements
- **Consistent Gradient Theme**: Updated chat bot page to match navigation styling
- **Fixed Layout Issues**: Resolved header overlap issues across pages
- **Improved Animations**: Enhanced hover effects and scroll-based animations

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Component Usage

### Reusable Components

All components are standalone and can be imported individually:

```typescript
// Example: Using the ProjectCard component
import { ProjectCardComponent } from './components/projectCard';

@Component({
  imports: [ProjectCardComponent],
  template: '<app-project-card [project]="projectData"></app-project-card>'
})
```

### Data Models

TypeScript interfaces are available for type safety:

```typescript
import { Project, Experience, TechSkill } from './models';
```

### Styling Architecture

- **Global Styles**: `src/styles.scss` contains CSS custom properties and global styles
- **Component Styles**: Each component has isolated SCSS using `@use` imports
- **Responsive Design**: Mobile-first approach with consistent breakpoints

## Development Notes

- **Standalone Components**: All components use Angular's standalone component pattern
- **Barrel Exports**: Each component folder includes an `index.ts` for clean imports
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Performance**: Lazy loading implemented for optimal bundle splitting
- **Maintainability**: Clear separation of concerns with modular architecture

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the established component architecture pattern
2. Use TypeScript interfaces for all data structures
3. Implement responsive design for all new components
4. Include proper documentation for new features
