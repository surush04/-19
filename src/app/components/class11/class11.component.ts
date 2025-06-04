import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-class11',
  templateUrl: './class11.component.html',
  styleUrls: ['./class11.component.css'],
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule ]
})
export class Class11Component implements OnInit {
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
      .filter(user => +user.classid === 11)
      .sort((a, b) => this.getTotalGrade(b) - this.getTotalGrade(a));  // Сартоб аз калон ба хурд
  });
}
}
