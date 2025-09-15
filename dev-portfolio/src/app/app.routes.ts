import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then(m => m.HomeComponent)
  },
  {
    path: 'd3-demo',
    loadComponent: () => import('./pages/d3-demo').then(m => m.D3DemoComponent)
  },
  {
    path: 'chat-bot',
    loadComponent: () => import('./pages/chat-bot').then(m => m.ChatBotComponent)
  }
];
