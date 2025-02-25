// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  firstName: string;
  lastName: string;
  age: number;
  grade: number;
  status: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // Суроғаи бекэнд

  constructor(private http: HttpClient) {}

  // Илова кардани донишҷӯ
  addStudent(student: any) {
    return this.http.post('http://localhost:3000/students', student);
  }
  
}
