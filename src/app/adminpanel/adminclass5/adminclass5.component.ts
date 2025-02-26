import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../student.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-adminclass5',
  templateUrl: './adminclass5.component.html',
  styleUrls: ['./adminclass5.component.css'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, HttpClientModule],
})
export class Adminclass5Component {
  studentForm: FormGroup;
  topStudents: any[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(6), Validators.max(18)]],
      grade: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Ба хотир гиред, ки тавсия медиҳем, ки маълумоти навро ба консоли сабт кунед
    console.log('Top Students in OnInit:', this.studentService.getTopThreeStudents());
  }
  // Method to handle form submission
  onSubmit(): void {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      console.log('Form Value:', newStudent);  // Лог кардан барои тафтиш
  
      // Илова кардани донишҷӯ ба хидмат
      this.studentService.addStudent(newStudent);
  
      // Намудор кардани донишҷӯҳои беҳтарин
      this.topStudents = this.studentService.getTopThreeStudents();
      
      // Восита барои тасдиқ кардани, ки маълумот дуруст илова шудааст
      console.log('Top Students:', this.topStudents);
  
      // Аз нав холи кардани форма
      this.studentForm.reset();
    }
  }
  
}
