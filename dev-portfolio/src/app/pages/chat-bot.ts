import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Chat Bot Demo</h1>
        <p>AI-powered conversational interface demonstration</p>
      </header>
      
      <main class="page-content">
        <section class="chat-section">
          <h2>Welcome to Chat Bot Demo</h2>
          <p>
            This page demonstrates a conversational AI interface built with Angular, Python, and AWS.
            This has been trained on my resume as well as publically available information about the companies I worked for.
          </p>
          <div class="chat-placeholder">
            <div class="placeholder-content">
              <div class="chat-icon">💬</div>
              <h3>Chat Interface Coming Soon</h3>
              <p>An interactive chatbot interface will be implemented here.</p>
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
      padding-top: 8rem;
      background: linear-gradient(135deg, #4f46e5, #6366f1, #8b5cf6);
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

    .chat-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .chat-section h2 {
      color: #333;
      margin-bottom: 1rem;
    }

    .chat-section p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .chat-placeholder {
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      padding: 3rem;
      text-align: center;
    }

    .placeholder-content .chat-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
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
        padding-top: 8rem;
      }

      .page-header h1 {
        font-size: 2rem;
      }

      .chat-section {
        padding: 1.5rem;
      }
    }
  `]
})
export class ChatBotComponent {}