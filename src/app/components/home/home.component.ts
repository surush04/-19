import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgIf, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: User[] = [];
  topStudentsByClass: { [key: string]: User } = {}; // Барои нигоҳ доштани беҳтаринҳо

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  getTotalGrade(user: User): number {
    return (user.grade1 || 0) + (user.grade2 || 0) + (user.grade3 || 0) + (user.grade4 || 0);
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe((data: User[]) => {
      this.users = data;

      // Барои ҳар синф беҳтарин хонандаро ёфтан
      const classIds = ['5', '6', '7', '8', '9', '10', '11'];
      for (const classId of classIds) {
        const classUsers = this.users.filter(user => user.classid === classId);
        let topUser: User | null = null;
        let maxGrade = -1;

        for (const user of classUsers) {
          const total = this.getTotalGrade(user);
          if (total > maxGrade) {
            maxGrade = total;
            topUser = user;
          }
        }

        if (topUser) {
          this.topStudentsByClass[classId] = topUser;
        }
      }

      console.log('Top students by class:', this.topStudentsByClass);
    });
  }
}
