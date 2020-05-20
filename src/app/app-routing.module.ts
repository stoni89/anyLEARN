import { SkillverwaltungComponent } from './Skillverwaltung/skillverwaltung/skillverwaltung.component';
import { BenutzerverwaltungComponent } from './Benutzerverwaltung/benutzerverwaltung/benutzerverwaltung.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'skillverwaltung',
    component: SkillverwaltungComponent
  },
  {
    path: 'benutzerverwaltung',
    component: BenutzerverwaltungComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
