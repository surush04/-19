import { Component } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: User[] = [];
  topStudentsByClass: { [key: string]: User } = {};
  showLoginModal = false;
  showError = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
 const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log('isLoggedIn:', isLoggedIn);
  if (isLoggedIn !== 'true') {
    console.log('Not logged in, redirecting...');
    this.router.navigate(['/']);
    return;
  }
  
  this.loadUsers();
}


  getTotalGrade(user: User): number {
    return (user.grade1 || 0) + (user.grade2 || 0) + (user.grade3 || 0) + (user.grade4 || 0);
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe((data: User[]) => {
      this.users = data;

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

  openLoginModal() {
    this.showLoginModal = true;
    this.showError = false;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  login(username: string, password: string) {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      this.closeLoginModal();
      this.router.navigate(['/admin-class5']);
    } else {
      this.showError = true;
    }
  }
}
