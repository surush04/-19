import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-class7',
  templateUrl: './class7.component.html',
  styleUrls: ['./class7.component.css'],
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule ]
})
export class Class7Component implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
   
   
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
archiveCurrentMonth() {
  if (confirm('Шумо мутмаин ҳастед, ки мехоҳед маълумотҳоро ба архив гузаронед ва холҳоро холӣ кунед?')) {
    this.apiService.archiveMonth().subscribe({
      next: (res) => {
        alert(res.message || 'Маълумот архив шуд ва холҳо холӣ шуданд!');
        this.loadUsers(); // Ин компоненташро навсозӣ мекунад
        // 📡 UserListComponentComponent худаш сигналро қабул мекунад
      },
      error: (err) => {
        alert('Хатогӣ: ' + err.message);
      }
    });
  }
}


  ngOnInit(): void {
    // Дар вақти бор кардани компонент, истифодабарандагонро бор кунем
    this.loadUsers();
  }
getTotalGrade(user: User): number {
  return (user.grade1 || 0) + (user.grade2 || 0) + (user.grade3 || 0) + (user.grade4 || 0);
}
  loadUsers(): void {
  this.apiService.getUsers().subscribe((data: User[]) => {
    this.users = data
      .filter(user => +user.classid === 7)
      .sort((a, b) => this.getTotalGrade(b) - this.getTotalGrade(a));  // Сартоб аз калон ба хурд
  });
}
getStars(user: User): string {
  const g1 = user.grade1 ?? 0;
  const g2 = user.grade2 ?? 0;  // null ё undefined бошад, 0 мегузорем
  const g3 = user.grade3 ?? 0;
  const g4 = user.grade4 ?? 0;
  const total = this.getTotalGrade(user);

  // Функсия барои тафсили холӣ будан (null, undefined, 0)
const isEmpty = (grade: number | null | undefined): boolean => grade == null || grade == 0;


  if (g1 > 0 && isEmpty(g2) && isEmpty(g3) && isEmpty(g4)) {
    if (total >= 25) return '⭐⭐⭐⭐⭐';
    if (total >= 23) return '⭐⭐⭐⭐';
    if (total >= 20) return '⭐⭐⭐';
    if (total >= 18) return '⭐⭐';
    if (total >= 15) return '⭐';
  }

  if (g1 > 0 && g2 > 0 && isEmpty(g3) && isEmpty(g4)) {
    if (total >= 50) return '⭐⭐⭐⭐⭐';
    if (total >= 47) return '⭐⭐⭐⭐';
    if (total >= 45) return '⭐⭐⭐';
    if (total >= 43) return '⭐⭐';
    if (total >= 40) return '⭐';
  }

  if (g1 > 0 && g2 > 0 && g3 > 0 && isEmpty(g4)) {
    if (total >= 75) return '⭐⭐⭐⭐⭐';
    if (total >= 73) return '⭐⭐⭐⭐';
    if (total >= 70) return '⭐⭐⭐';
    if (total >= 68) return '⭐⭐';
    if (total >= 65) return '⭐';
  }

  if (g1 > 0 && g2 > 0 && g3 > 0 && g4 > 0) {
    if (total >= 100) return '⭐⭐⭐⭐⭐';
    if (total >= 95) return '⭐⭐⭐⭐';
    if (total >= 90) return '⭐⭐⭐';
    if (total >= 85) return '⭐⭐';
    if (total >= 80) return '⭐';
  }

  return '';
}
}
