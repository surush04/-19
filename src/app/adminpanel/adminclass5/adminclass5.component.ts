import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-adminclass5',
  templateUrl: './adminclass5.component.html',
  styleUrls: ['./adminclass5.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NgIf,NgFor],
})
export class Adminclass5Component implements OnInit{
  users: User[] = [];
  userForm: FormGroup;
 isModalOpen = false;
 archivedUsers: User[] = [];
  loading = false;
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
selectedUser: any = null;
  error: string | undefined;

openModal(user: any): void {
  this.selectedUser = { ...user }; // Clone so we don’t edit original before saving
  this.isModalOpen = true;
}

closeModal(): void {
  this.isModalOpen = false;
  this.selectedUser = null;
}
  constructor(private apiService: ApiService) {
    // Иҷод кардани форм барои илова кардани истифодабаранда
    this.userForm = new FormGroup({
      name: new FormControl(''),
      father_name: new FormControl(''),
      birth_year: new FormControl(''),
      classid: new FormControl(''),
      grade1: new FormControl(0),
      grade2: new FormControl(0),
      grade3: new FormControl(0),
      grade4: new FormControl(0),
      status: new FormControl(0),
    });
    
  }

  ngOnInit(): void {
    // Дар вақти бор кардани компонент, истифодабарандагонро бор кунем
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      

    });
  }

  addUser(): void {
    const user = this.userForm.value;
    this.apiService.addUser(user).subscribe(() => {
      this.loadUsers();
      this.userForm.reset();
    });
  }

updateUser(id: number, grade1: number, grade2: number, grade3: number, grade4: number): void {
  console.log('Ирсоли маълумот барои навсозӣ:', {
    id,
    grade1,
    grade2,
    grade3,
    grade4
  });

  this.apiService.updateUser(id, grade1, grade2, grade3, grade4).subscribe({
    next: (response) => {
      console.log('Навсозӣ бомуваффақият анҷом ёфт:', response);
      this.loadUsers();
      this.closeModal();
    },
    error: (error) => {
      console.error('Хатогӣ ҳангоми навсозӣ:', error);
      alert('Хатогӣ дар вақти навсозии корбар ба амал омад. Лутфан дубора санҷед.');
    }
  });
}


  deleteUser(id: number): void {
    if (confirm('Шумо мутмаин ҳастед, ки мехоҳед ин хонандаро ҳазф кунед?')) {
      this.apiService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
onInputChange(userId: number, gradeIndex: number, value: string): void {
  const grade = parseFloat(value); // ё parseInt(value)
  const user = this.users.find(u => u.id === userId);
  if (user) {
    switch (gradeIndex) {
      case 1: user.grade1 = grade; break;
      case 2: user.grade2 = grade; break;
      case 3: user.grade3 = grade; break;
      case 4: user.grade4 = grade; break;
    }
  }
}
getRowColor(classid: number): string {
  const colors: Record<number, string> = {
    5: 'lightblue',
    6: 'red',
    7: 'yellow',
    8: 'orange',
    9: 'pink',
    10: 'purple',
    11: 'green',
  };
  return colors[classid] || 'white';
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
