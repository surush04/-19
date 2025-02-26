import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-class6',
  templateUrl: './class6.component.html',
  styleUrls: ['./class6.component.css'],
  standalone: true,
  imports: [NgIf,NgFor]
})
export class Class6Component implements OnInit {
  students: any[] = []; // Массиви ёддошти донишҷӯён
  studentForm: FormGroup;

  constructor(private studentService: StudentService) { // Инжексияи сервис
    this.studentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(5)]),
      grade: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    // Маълумотро аз сервис гирифта, барои students дар Class5Component истифода мебарем
    this.students = this.studentService.students;
  }

  addStudent(): void {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      this.studentService.addStudent(newStudent); // Илова кардани донишҷӯ ба сервис
      this.students = [...this.studentService.students]; // Воситаи навсозии массив
      this.studentForm.reset(); // Тоза кардани форма
    }
  }

  getTopThreeStudents(): any[] {
    return this.studentService.getTopThreeStudents(); // Гирифтани 3 донишҷӯи беҳтарин аз сервис
  }
}
