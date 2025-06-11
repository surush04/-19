import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgIf, ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
   
  showLoginModal = false;
  showError = false;
topStudentsByClass: { [classid: number]: User } = {};
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
ngAfterViewInit(): void {
  setTimeout(() => this.loadUsers(), 0);
}

  getTotalGrade(user: User): number {
    return (user.grade1 || 0) + (user.grade2 || 0) + (user.grade3 || 0) + (user.grade4 || 0);
  }


loadUsers(): void {
  this.apiService.getUsers().subscribe((data: User[]) => {
    const filteredUsers = data.filter(user => {
      const classId = +user.classid;
      return classId >= 5 && classId <= 11;
    });

    const topUsersPerClass = new Map<number, User>();

    filteredUsers.forEach(user => {
      const classId = +user.classid;
      const currentTopUser = topUsersPerClass.get(classId);

      if (!currentTopUser || this.getTotalGrade(user) > this.getTotalGrade(currentTopUser)) {
        topUsersPerClass.set(classId, user);
      }
    });

    // Ба объект табдил медиҳем, то дар HTML истифода шавад
    topUsersPerClass.forEach((user, classId) => {
      this.topStudentsByClass[classId] = user;
    });
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
    if (username === 'admin' && password === '2004') {
      localStorage.setItem('isLoggedIn', 'true');
      this.closeLoginModal();
      this.router.navigate(['/admin-class5']);
    } else {
      this.showError = true;
    }
  }
}
