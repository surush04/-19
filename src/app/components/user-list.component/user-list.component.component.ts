import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { Subscription } from 'rxjs';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-list.component',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './user-list.component.component.html',
  styleUrls: ['./user-list.component.component.css']
})
export class UserListComponentComponent implements OnInit, OnDestroy {
  archivedUsers: User[] = [];
  loading = false;
  error = '';
  months = [
    'Сентябр', 'Октябр', 'Ноябр', 'Декабр',
    'Январ', 'Феврал', 'Март', 'Апрел', 'Май','июн'
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
  };
  selectedMonth: string | null = null;

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

    return this.archivedUsers.filter(user => {
      if (!user.archived_at) return false;

      const archivedDate = new Date(user.archived_at);
      const month = archivedDate.getMonth() + 1;
      const year = archivedDate.getFullYear();

     return (
  year === 2025 &&
  month === selectedMonthNum
);
    });
  }

  archiveCurrentMonth(month: string) {
    if (confirm(`Шумо мутмаин ҳастед, ки мехоҳед маълумотҳоро барои моҳи ${month} ба архив гузаронед ва холҳоро холӣ кунед?`)) {
      const monthNumber = this.monthMap[month];
      console.log(monthNumber);
      
    const year = 2025; // Солро ҳамин тавр муқаррар мекунем
console.log(year);

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
        console.log(this.archivedUsers);
      },
      error: err => {
        this.error = 'Хатогӣ дар гирифтани маълумоти архившуда';
        this.loading = false;
      }
    });
  }
}
