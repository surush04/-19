import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Class5Component } from '../class5/class5.component';
import { NgIf } from '@angular/common';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  topStudents: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.topStudents = this.studentService.getTopThreeStudents(); // Шарик кардани маълумот
  }
}
