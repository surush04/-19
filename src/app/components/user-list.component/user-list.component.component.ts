import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { Subscription } from 'rxjs';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NgStyle } from '@angular/common';

interface UserTotalGrade {
  name: string;
  totalGrade: number;
}

@Component({
  selector: 'app-user-list.component',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, NgStyle],
  templateUrl: './user-list.component.component.html',
  styleUrls: ['./user-list.component.component.css']
})
export class UserListComponentComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {}

  openModal(month: string) {
    this.selectedMonth = month;
  }

  closeModal() {
    this.selectedMonth = null;
  }

  get filteredArchivedUsers() {
    if (!this.selectedMonth) return [];

    const selectedMonthNum = this.monthMap[this.selectedMonth];

    return this.archivedUsers
      .filter(user => {
        if (!user.archived_at) return false;

        const archivedDate = new Date(user.archived_at);
        const month = archivedDate.getMonth() + 1;
        const year = archivedDate.getFullYear();

        const classIdNum = parseInt(user.classid, 10);

        return (
          year === 2025 &&
          month === selectedMonthNum &&
          classIdNum >= 5 &&
          classIdNum <= 11
        );
      })
      .sort((a, b) => parseInt(a.classid, 10) - parseInt(b.classid, 10));
  }

  hasAnyPercentage(month: string): boolean {
    const percents = this.getPercentageByGradeRangeForMonth(month);
    return percents.red > 0 || percents.yellow > 0 || percents.green > 0;
  }

  getPercentageByGradeRangeForMonth(month: string): { red: number; yellow: number; green: number } {
    const selectedMonthNum = this.monthMap[month];
    const users = this.archivedUsers.filter(user => {
      if (!user.archived_at) return false;

      const archivedDate = new Date(user.archived_at);
      const monthNum = archivedDate.getMonth() + 1;
      const year = archivedDate.getFullYear();

      const classIdNum = parseInt(user.classid, 10);

      return (
        year === 2025 &&
        monthNum === selectedMonthNum &&
        classIdNum >= 5 &&
        classIdNum <= 11
      );
    });

    const total = users.length;
    if (total === 0) return { red: 0, yellow: 0, green: 0 };

    let red = 0;
    let yellow = 0;
    let green = 0;

    for (const user of users) {
      const totalGrade = this.getTotalGrade(user);
      if (totalGrade <= 40) red++;
      else if (totalGrade <= 60) yellow++;
      else green++;
    }

    return {
      red: Number(((red / total) * 100).toFixed(2)),
      yellow: Number(((yellow / total) * 100).toFixed(2)),
      green: Number(((green / total) * 100).toFixed(2)),
    };
  }

  archiveCurrentMonth(month: string) {
    if (confirm(`Шумо мутмаин ҳастед, ки мехоҳед маълумотҳоро барои моҳи ${month} ба архив гузаронед ва холҳоро холӣ кунед?`)) {
      const monthNumber = this.monthMap[month];
      const year = 2025;

      this.apiService.archiveMonth(monthNumber, year).subscribe({
        next: (res) => {
          alert(res.message || 'Маълумот архив шуд ва холҳо холӣ шуданд!');
          this.loadArchivedUsers();
        },
        error: (err) => {
          alert('Хатогӣ: ' + err.message);
        }
      });
    }
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
    const userGradesMap: { [name: string]: number } = {};

    for (const user of this.archivedUsers) {
      if (!user.archived_at) continue;

      const archivedDate = new Date(user.archived_at);
      const month = archivedDate.getMonth() + 1;
      const year = archivedDate.getFullYear();
      const classIdNum = parseInt(user.classid, 10);

      if (year === 2025 && monthNumbers.includes(month) && classIdNum >= 5 && classIdNum <= 11) {
        const grade = this.getTotalGrade(user);
        if (userGradesMap[user.name]) {
          userGradesMap[user.name] += grade;
        } else {
          userGradesMap[user.name] = grade;
        }
      }
    }

    const result: UserTotalGrade[] = [];
    for (const name in userGradesMap) {
      result.push({ name, totalGrade: userGradesMap[name] });
    }

    // Сортировка аз зиёд ба кам
    result.sort((a, b) => b.totalGrade - a.totalGrade);

    return result;
  }

  getTotalGrade(user: User): number {
    return (user.grade1 || 0) + (user.grade2 || 0) + (user.grade3 || 0) + (user.grade4 || 0);
  }
}
