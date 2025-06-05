import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  father_name: string;
  birth_year: number;
  classid: string;
  grade1: number;
  grade2: number;
  grade3: number;
  grade4: number;
  status: number;
  archived_at?:number;  // имкон дорад холӣ бошад
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://34:3000/api/users';
  refreshNeeded: any;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

updateUser(
  id: number,
  grade1: number,
  grade2: number,
  grade3: number,
  grade4: number
): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/grades`, { grade1, grade2, grade3, grade4 });
}
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  archiveMonth(): Observable<any> {
  return this.http.post(`${this.apiUrl}/archive-month`, {});
  
}

 getArchivedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/archived_users`);
  }
}
