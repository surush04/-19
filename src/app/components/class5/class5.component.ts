import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-class5',
  templateUrl: './class5.component.html',
  styleUrls: ['./class5.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule]
})
export class Class5Component implements OnInit {
  students: any[] = [];
  studentForm: FormGroup;

  constructor(private http: HttpClient) {
    this.studentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(5)]),
      grade: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/class5').subscribe(
      data => {
        this.students = data as any[];
        // Sort students by grade in descending order
        this.sortStudents();
      },
      error => {
        console.error('Error loading data:', error);
      }
    );
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
      this.http.post('http://localhost:3000/class5', newStudent).subscribe(
        (response) => {
          console.log('Student added successfully', response);
          this.students.push(newStudent); // Add the new student to the list
          this.sortStudents(); // Sort the students again
          this.studentForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error adding student', error);
        }
      );
    }
  }

  // Method to sort students by grade in descending order
  getTopThreeStudents(): any[] {
    if (!this.students?.length) {
      return [];
    }
    
    return [...this.students]
      .sort((a, b) => Number(b.grade) - Number(a.grade)) // Ба тартиби камшавӣ сорт мекунад
      .slice(0, 3); // Танҳо 3 хонандаро мегирад
  }
  
  
  
}
