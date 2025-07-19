import { Component } from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../model/project';
import {NgForOf, NgIf} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-apis',
  imports: [
    NgForOf,
    NgIf,
    DialogModule,
    RouterLink
  ],
  templateUrl: './apis.component.html',
  standalone: true,
  styleUrl: './apis.component.css'
})
export class ApisComponent {

  apis: Project[] = [];
  visible: boolean = false;

  constructor(private readonly projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.apis = projects.map(project => ({
          ...project,
          createdAt: new Date(project.createdAt)
        }));
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
}
