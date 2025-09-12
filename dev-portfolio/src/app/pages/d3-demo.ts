import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-d3-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>D3.js Demo</h1>
        <p>Interactive data visualization demonstrations</p>
      </header>
      
      <main class="page-content">
        <section class="demo-section">
          <h2>Welcome to D3 Demo</h2>
          <p>
            This page will showcase various D3.js visualizations and interactive charts.
            D3.js is a powerful JavaScript library for creating dynamic, interactive data visualizations in web browsers.
          </p>
          
          <div class="demo-placeholder">
            <div class="placeholder-content">
              <h3>Demo Coming Soon</h3>
              <p>Interactive D3.js visualizations will be added here.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .page-header {
      text-align: center;
      color: white;
      margin-bottom: 3rem;
    }

    .page-header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .page-header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .page-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .demo-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .demo-section h2 {
      color: #333;
      margin-bottom: 1rem;
    }

    .demo-section p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .demo-placeholder {
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      padding: 3rem;
      text-align: center;
    }

    .placeholder-content h3 {
      color: #6c757d;
      margin-bottom: 1rem;
    }

    .placeholder-content p {
      color: #868e96;
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .page-header h1 {
        font-size: 2rem;
      }

      .demo-section {
        padding: 1.5rem;
      }
    }
  `]
})
export class D3DemoComponent {}