import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { Subscription } from 'rxjs';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface UserTotalGrade {
  name: string;
  totalGrade: number;
   classid: string;
   father_name: string;
}
@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {
archivedUsers: User[] = [];
  loading = false;
  error = '';

  months = [
    'Сентябр', 'Октябр', 'Ноябр', 'Декабр',
    'Январ', 'Феврал', 'Март', 'Апрел', 'Май', 'июн', 'июл', 'август'
  ];

  monthMap: { [key: string]: number } = {
    'Сентябр': 9,
    'Октябр': 10,
    'Ноябр': 11,
    'Декабр': 12,
    'Январ': 1,
    'Феврал': 2,
    'Март': 3,
    'Апрел': 4,
    'Май': 5,
    'июн': 6,
    'июл': 7,
    'август': 8,
  };

  selectedMonth: string | null = null;

  // Ҷамъии холҳо барои ҳар нафар дар 3 моҳ
  totalGradesPerUserInThreeMonths: UserTotalGrade[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadArchivedUsers();
  }
 

 

  

  loadArchivedUsers(): void {
    this.loading = true;
    this.apiService.getArchivedUsers().subscribe({
      next: users => {
        this.archivedUsers = users;
        this.loading = false;

        // Барои мисол, моҳҳои Май, Июн, Июл ҷамъ мекунем холҳоро
        this.totalGradesPerUserInThreeMonths = this.calculateTotalGradesPerUser(['Май', 'июн', 'июл']);
      },
      error: err => {
        this.error = 'Хатогӣ дар гирифтани маълумоти архившуда';
        this.loading = false;
      }
    });
  }

 calculateTotalGradesPerUser(months: string[]): UserTotalGrade[] {
  const monthNumbers = months.map(month => this.monthMap[month]);
  const userGradesMap: { [key: string]: { name: string; classid: string; totalGrade: number;father_name:string } } = {};

  for (const user of this.archivedUsers) {
    if (!user.archived_at) continue;

    const archivedDate = new Date(user.archived_at);
    const month = archivedDate.getMonth() + 1;
    const year = archivedDate.getFullYear();
    const classIdNum = parseInt(user.classid, 10);

    if (year === 2025 && monthNumbers.includes(month) && classIdNum >= 5 && classIdNum <= 11) {
      const grade = this.getTotalGrade(user);
      const key = user.name + '_' + user.classid;

      if (userGradesMap[key]) {
        userGradesMap[key].totalGrade += grade;
      } else {
        userGradesMap[key] = {
          name: user.name,
          father_name: user.father_name,
          classid: user.classid,
          totalGrade: grade
        };
      }
    }
  }

  const result: UserTotalGrade[] = Object.values(userGradesMap);
  result.sort((a, b) => b.totalGrade - a.totalGrade);
  return result;
}


  getTotalGrade(user: User): number {
    return (user.grade1 || 0) + (user.grade2 || 0) + (user.grade3 || 0) + (user.grade4 || 0);
  }
get level100Users() {
  return this.totalGradesPerUserInThreeMonths.filter(u => u.totalGrade >= 100 && u.totalGrade < 200);
}
get level200Users() {
  return this.totalGradesPerUserInThreeMonths.filter(u => u.totalGrade >= 200 && u.totalGrade < 300);
}
get level300Users() {
  return this.totalGradesPerUserInThreeMonths.filter(u => u.totalGrade >= 300);
}
 
}
