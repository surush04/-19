import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-class6',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './class6.component.html',
  styleUrl: './class6.component.css'
})
export class Class6Component {
 students: any[] = []; // Массиви ёддошти донишҷӯён
  studentForm: FormGroup;

  constructor() {
    // Иҷоди формаи шенасоии донишҷӯ
    this.studentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(5)]),
      grade: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Маълумот ба таври статикӣ
    this.students = [
      { firstName: 'Ali', lastName: 'Ahmadov', age:10,grade: 95, status: 'active' },
      { firstName: 'Sara', lastName: 'Zafar', age: 10, grade: 88, status: 'inactive' },
      { firstName: 'Jamil', lastName: 'Tursu', age: 11, grade: 92, status: 'active' },
      { firstName: 'Salim', lastName: 'fpolov', age: 11, grade: 93, status: 'active' },
      { firstName: 'samad', lastName: 'jamolov', age: 11, grade: 92, status: 'active' },
      { firstName: 'halim', lastName: 'nabot', age: 11, grade: 91, status: 'active' },
      { firstName: 'daler', lastName: 'sssss', age: 11, grade: 92, status: 'active' },
      { firstName: 'samad', lastName: 'jamolov', age: 11, grade: 92, status: 'active' },
    ];
    this.sortStudents(); // Сорт кардани донишҷӯён
  }

  sortStudents() {
    if (!this.students || !this.students.length) {
      console.warn("Массиви students холӣ аст!");
      return;
    }
    this.students.sort((a, b) => b.grade - a.grade); // Ба тартиби камшавӣ сорт мекунад
  }

  addStudent(): void {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      this.students.push(newStudent); // Ворид кардани донишҷӯи нав ба массив
      this.sortStudents(); // Сорт кардани донишҷӯён
      this.studentForm.reset(); // Тоза кардани форма
    }
  }

  getTopThreeStudents(): any[] {
    if (!this.students?.length) {
      return [];
    }

    return [...this.students]
      .sort((a, b) => Number(b.grade) - Number(a.grade)) // Ба тартиби камшавӣ сорт мекунад
      .slice(0, 3); // Танҳо 3 хонандаро мегирад
  }
}
