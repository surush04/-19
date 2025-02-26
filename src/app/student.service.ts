import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: any[] = [
    { firstName: 'Ali', lastName: 'Ahmadov', age: 10, grade: 95, status: 'active' },
    { firstName: 'Sara', lastName: 'Zafar', age: 10, grade: 88, status: 'inactive' },
    { firstName: 'Jamil', lastName: 'Tursunov', age: 11, grade: 92, status: 'active' },
    { firstName: 'Salim', lastName: 'rfpolov', age: 11, grade: 97, status: 'active' },
    { firstName: 'samad', lastName: 'jamolov', age: 11, grade: 92, status: 'active' },
    { firstName: 'halim', lastName: 'nabot', age: 11, grade: 91, status: 'active' },
    { firstName: 'daler', lastName: 'sssss', age: 11, grade: 92, status: 'active' },
    { firstName: 'samad', lastName: 'jamolov', age: 11, grade: 92, status: 'active' },
  ];

  // Method to get the top 3 students
  getTopThreeStudents(): any[] {
    return this.students.sort((a, b) => b.grade - a.grade).slice(0, 3);
  }

  // Method to add a new student
  addStudent(student: any): void {
    console.log('Adding Student:', student);
    
    // Илова кардани донишҷӯ бо push
    this.students.push(student);
    console.log('After push, All Students:', this.students);
    
    // Сорт кардани донишҷӯҳо
    this.sortStudents();
    
    console.log('Sorted Students:', this.students);
  }
  

  // Method to sort the students by grade
  private sortStudents(): void {
    this.students = [...this.students].sort((a, b) => b.grade - a.grade);  // Use a new array reference
  }
}
