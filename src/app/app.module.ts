import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard} from 'microsoft-adal-angular6';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { DashboardSkillListComponent } from './Dashboard/dashboard-skill-list/dashboard-skill-list.component';
import { BenutzerverwaltungComponent } from './Benutzerverwaltung/benutzerverwaltung/benutzerverwaltung.component';
import { SkillverwaltungComponent } from './Skillverwaltung/skillverwaltung/skillverwaltung.component';
import { BenutzerverwaltungListComponent } from './Benutzerverwaltung/benutzerverwaltung-list/benutzerverwaltung-list.component';
import { BenutzerverwaltungUserItemComponent } from './Benutzerverwaltung/benutzerverwaltung-user-item/benutzerverwaltung-user-item.component';
import { SkillverwaltungListComponent } from './Skillverwaltung/skillverwaltung-list/skillverwaltung-list.component';
import { SkillverwaltungSkillItemComponent } from './Skillverwaltung/skillverwaltung-skill-item/skillverwaltung-skill-item.component';
import { DashboardListItemComponent } from './Dashboard/dashboard-list-item/dashboard-list-item.component';
import { LogoutComponent } from './Logout/logout/logout.component';
import { StatusChangeItemComponent } from './Dashboard/status-change-item/status-change-item.component';
import { VermittlerChangeItemComponent } from './Dashboard/vermittler-change-item/vermittler-change-item.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardSkillListComponent,
    BenutzerverwaltungComponent,
    SkillverwaltungComponent,
    BenutzerverwaltungListComponent,
    BenutzerverwaltungUserItemComponent,
    SkillverwaltungListComponent,
    SkillverwaltungSkillItemComponent,
    DashboardListItemComponent,
    LogoutComponent,
    StatusChangeItemComponent,
    VermittlerChangeItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MsAdalAngular6Module.forRoot({
      tenant: '0a9e2776-62d5-46c5-9650-ec0cc551babf',
      clientId: 'df4e9ceb-596c-4ff5-b344-db62b0aab33d',
      redirectUri: 'http://localhost:4200/',
      endpoints: {
        'https://graph.microsoft.com': 'df4e9ceb-596c-4ff5-b344-db62b0aab33d', // this is for feteching the access token
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: 'http://localhost:4200/logout',
    })
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent],
  entryComponents: [BenutzerverwaltungUserItemComponent, SkillverwaltungSkillItemComponent, DashboardListItemComponent,
                    StatusChangeItemComponent]
})
export class AppModule {
}
