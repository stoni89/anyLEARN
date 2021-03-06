import { SelektierenComponent } from './Selektieren/selektieren/selektieren.component';
import { SkillverwaltungComponent } from './Skillverwaltung/skillverwaltung/skillverwaltung.component';
import { BenutzerverwaltungComponent } from './Benutzerverwaltung/benutzerverwaltung/benutzerverwaltung.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { LogoutComponent } from './Logout/logout/logout.component';
import { PostComponent } from './Mittelungen/post/post.component';
import { LogsComponent } from './Logs/logs/logs.component';
import { EinstellungenComponent } from './Einstellungen/einstellungen/einstellungen.component';


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
    path: 'einstellungen',
    component: EinstellungenComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'selektieren',
    component: SelektierenComponent,
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
