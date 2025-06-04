import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, User } from '../../api.service';
import { Subscription } from 'rxjs';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-list.component',
  standalone: true,
  imports: [NgFor,NgIf,DatePipe ],
  templateUrl: './user-list.component.component.html',
  styleUrl: './user-list.component.component.css'
})
export class UserListComponentComponent implements OnInit, OnDestroy {
  archivedUsers: User[] = [];
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.loadArchivedUsers();
  }
archiveCurrentMonth() {
  if (confirm('Шумо мутмаин ҳастед, ки мехоҳед маълумотҳоро ба архив гузаронед ва холҳоро холӣ кунед?')) {
    this.apiService.archiveMonth().subscribe({
      next: (res) => {
        alert(res.message || 'Маълумот архив шуд ва холҳо холӣ шуданд!');
        // Ин компоненташро навсозӣ мекунад
        // 📡 UserListComponentComponent худаш сигналро қабул мекунад
         this.loadArchivedUsers();
      },
      error: (err) => {
        alert('Хатогӣ: ' + err.message);
      }
    });
  }
}
  loadArchivedUsers(): void {
    this.loading = true;
    this.apiService.getArchivedUsers().subscribe({
      next: users => {
        this.archivedUsers = users;
        this.loading = false;
        console.log(this.archivedUsers);
        
      },
      error: err => {
        this.error = 'Хатогӣ дар гирифтани маълумоти архившуда';
        this.loading = false;
      }
    });
  }
}
