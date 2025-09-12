import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { D3DemoComponent } from './pages/d3-demo';
import { ChatBotComponent } from './pages/chat-bot';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'd3-demo', component: D3DemoComponent },
  { path: 'chat-bot', component: ChatBotComponent }
];
