// src/app/adminclass5/adminclass5.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../student.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-adminclass5',
  templateUrl: './adminclass5.component.html',
  styleUrls: ['./adminclass5.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  providers: [StudentService]
})
export class Adminclass5Component {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    // Иҷод кардани формуляр
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      grade: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  // Функсия барои илова кардани донишҷӯ
  addStudent(): void {
    if (this.studentForm.valid) {
      console.log('Form Data:', this.studentForm.value);  // Log the form data
      this.studentService.addStudent(this.studentForm.value).subscribe({
        next: (student) => {
          console.log('Донишҷӯ илова шуд:', student);
        },
        error: (err) => {
          console.error('Хатои илова кардан:', err);
        }
      });
    } else {
      console.log('Форма нодуруст аст');
    }
  }
  
}
