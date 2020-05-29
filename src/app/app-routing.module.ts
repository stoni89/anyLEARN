import { SkillverwaltungComponent } from './Skillverwaltung/skillverwaltung/skillverwaltung.component';
import { BenutzerverwaltungComponent } from './Benutzerverwaltung/benutzerverwaltung/benutzerverwaltung.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { LogoutComponent } from './Logout/logout/logout.component';
import { PostComponent } from './Mittelungen/post/post.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'skillverwaltung',
    component: SkillverwaltungComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'benutzerverwaltung',
    component: BenutzerverwaltungComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
