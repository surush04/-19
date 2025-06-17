import { Routes } from '@angular/router';
import { Class5Component } from './components/class5/class5.component';
 // Импорт кардани компонент
import { Class6Component } from './components/class6/class6.component';
import { Class7Component } from './components/class7/class7.component';
import { Class8Component } from './components/class8/class8.component';
import { Class9Component } from './components/class9/class9.component';
import { Class10Component } from './components/class10/class10.component';
import { Class11Component } from './components/class11/class11.component';
import { HomeComponent } from './components/home/home.component';
import { Adminclass5Component } from './adminpanel/adminclass5/adminclass5.component';
import { UserListComponentComponent } from './components/user-list.component/user-list.component.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ZigarComponent } from './components/user-list.component/zigar/zigar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Саҳифаи хонаи асосӣ
  { path: 'class5', component: Class5Component },
  { path: 'admin-class5', component: Adminclass5Component },  // Роут барои `Adminclass5Component`
  { path: 'class6', component: Class6Component },
  { path: 'class7', component: Class7Component },
  { path: 'class8', component: Class8Component },
  { path: 'class9', component: Class9Component },
  { path: 'class10', component: Class10Component },
  { path: 'class11', component: Class11Component },
  { path: 'UserList', component: UserListComponentComponent },
  { path: 'Achievements', component: AchievementsComponent },
  { path: 'Zigar', component: ZigarComponent },

  { path: '**', redirectTo: '' }  // Роути default
];
