import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';
import {KeyValuePipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import {FormsModule} from '@angular/forms';
import {StyleClassModule} from 'primeng/styleclass';
import {Project} from '../../../model/project';

@Component({
  selector: 'app-api-details',
  imports: [
    NgIf,
    TabViewModule,
    FormsModule,
    NgClass,
    NgForOf,
    KeyValuePipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    StyleClassModule
  ],
  templateUrl: './api-details.component.html',
  standalone: true,
  styleUrl: './api-details.component.css'
})
export class ApiDetailsComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  api: Project = {
    apiKey: '',
    name: '',
    description: '',
    createdAt: new Date(),
    entities: []
  };
  promptInput: string = '';
  messages: ChatMessage[] = [];
  isTyping: boolean = false;
  stats: any = {};
  state: boolean = false;
  private shouldScrollToBottom: boolean = false;

  constructor(private readonly projectService: ProjectService, private readonly route: ActivatedRoute, private readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const apiKey = params.get('apiKey');
      if (apiKey) {
        this.loadProject(apiKey);
        this.loadMessages(apiKey);
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private loadProject(apiKey: string): void {
    this.projectService.getProjectByApiKey(apiKey).subscribe({
      next: (project: Project) => {
        this.api = {
          ...project,
          createdAt: new Date(project.createdAt)
        };

        if (this.api.entities) {
          this.loadEntities(this.api.apiKey);
          this.loadStats(apiKey);
          this.loadProjectState();
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch project details. Please try again later.'
        });
        console.error('Error fetching project:', error);
      }
    });
  }

  private loadMessages(apiKey: string): void {
    this.projectService.getPromptHistory(apiKey).subscribe({
      next: (messages: ChatMessage[]) => {
        this.messages = messages
          .map((message: ChatMessage) => ({
            ...message,
            created_at: message.created_at
          }))
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        this.loadModel();
        this.shouldScrollToBottom = true;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch chat history. Please try again later.'
        });
        console.error('Error fetching chat history:', error);
      }
    });
  }

  sendMessage(): void {
    if (!this.promptInput.trim() || this.isTyping || !this.api?.apiKey) {
      return;
    }

    const userMessage: ChatMessage = {
      apiKey: this.api.apiKey,
      role: 'USER',
      content: this.promptInput.trim(),
      created_at: new Date().toISOString()
    };

    this.messages.push(userMessage);
    this.shouldScrollToBottom = true;

    const messageContent = this.promptInput.trim();
    this.promptInput = '';
    this.isTyping = true;

    this.projectService.generateProjectStructure(this.api.apiKey, messageContent).subscribe({
      next: (response) => {
        console.log('AI response:', response);
        this.isTyping = false;
        this.messages = response.map((msg: any) => ({
          apiKey: this.api?.apiKey || '',
          role: msg.role,
          content: msg.content,
          created_at: new Date(msg.created_at).toISOString()
        }));
        this.loadModel();

        this.shouldScrollToBottom = true;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'AI response generated successfully!'
        });
      },
      error: (error) => {
        this.isTyping = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to generate response. Please try again later.'
        });
        console.error('Error generating response:', error);
      }
    });
  }

  loadModel() {
    this.messages.forEach(message => {
      if (message.role === 'SYSTEM') {
        message.model = JSON.parse(message.content.replace(/\\n/g, '').replace(/\\/g, ''));
        console.log('Model loaded:', message.model);
      }
    });
  }

  setSuggestion(suggestion: string): void {
    this.promptInput = suggestion;
  }

  onTextareaInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.resizeTextArea(textarea);
  }

  onTextareaKeyDown(event: KeyboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;

    if (event.key === 'Enter' && event.shiftKey) {
      // Allow default behavior for Shift+Enter (new line)
      setTimeout(() => {
        this.resizeTextArea(textarea);
      }, 0);
    } else if (event.key === 'Enter' && !event.shiftKey) {
      // Handle regular Enter (send message)
      event.preventDefault();
      this.sendMessage();
    }
  }

  private resizeTextArea(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    const maxHeight = 120;
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  protected readonly window = window;

  getForeignKeyInfo(value: any): string {
    if (
      value &&
      typeof value === 'object' &&
      'target_entity' in value &&
      'target_field' in value &&
      'relation_type' in value
    ) {
      return `${value.target_entity}(${value.target_field}) : ${value.relation_type}`;
    }
    return 'Invalid FOREIGN_KEY';
  }

  getConstraintClass(key: unknown): string {
    switch (key) {
      case 'PRIMARY_KEY':
      case 'UNIQUE':
        return 'text-warning border border-warning';
      case 'FOREIGN_KEY':
        return 'text-error border border-error';
      case 'NOT_NULL':
        return 'text-secondary border border-secondary';
      default:
        return 'text-success border border-success';
    }
  }


  useTemplate(model: any) {
    this.projectService.createProjectStructure(this.api?.apiKey || '', JSON.stringify(model)).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Project structure created successfully!'
        });
        this.loadMessages(this.api?.apiKey || '');
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create project structure. Please try again later.'
        });
        console.error('Error creating project structure:', error);
      }
    });
  }

  loadStats(apiKey: string) {
    this.projectService.getProjectStats(apiKey).subscribe({
      next: (stats: any) => {
        this.stats = stats;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch project stats. Please try again later.'
        });
        console.error('Error fetching project stats:', error);
      }
    });
  }

  loadEntities(apiKey: string) {
    this.projectService.getEntitiesByProjectApiKey(apiKey).subscribe({
      next: (entities: any[]) => {
        if (this.api) {
          this.api.entities = entities.map(entity => ({
            ...entity,
            createdAt: new Date(entity.createdAt)
          }));
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch entities. Please try again later.'
        });
        console.error('Error fetching entities:', error);
      }
    });
  }

  loadProjectState() {
    this.projectService.getProjectState(this.api?.apiKey || '').subscribe({
      next: (state: any) => {
        this.state = state.isRunning;
        console.log('Project state:', this.state);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch project state. Please try again later.'
        });
        console.error('Error fetching project state:', error);
      }
    });
  }
}
