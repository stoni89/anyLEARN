import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard} from 'microsoft-adal-angular6';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';

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
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableExporterModule } from 'mat-table-exporter';

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
import { PostListComponent } from './Mittelungen/post-list/post-list.component';
import { PostComponent } from './Mittelungen/post/post.component';
import { PostService } from './Shared/Services/post.service';
import { PostListItemComponent } from './Mittelungen/post-list-item/post-list-item.component';
import { LogsComponent } from './Logs/logs/logs.component';
import { LogsListComponent } from './Logs/logs-list/logs-list.component';
import { SkillverwaltungSkillRemoveComponent } from './Skillverwaltung/skillverwaltung-skill-remove/skillverwaltung-skill-remove.component';
import { SelektierenComponent } from './Selektieren/selektieren/selektieren.component';
import { SelektierenListComponent } from './Selektieren/selektieren-list/selektieren-list.component';
import { SelektierenStatusChangeComponent } from './Selektieren/selektieren-status-change/selektieren-status-change.component';
import { SkillverwaltungLinksComponent } from './Skillverwaltung/skillverwaltung-links/skillverwaltung-links.component';
import { SkillverwaltungLinksItemComponent } from './Skillverwaltung/skillverwaltung-links/skillverwaltung-links-item/skillverwaltung-links-item.component';
import { DashboardLinksComponent } from './Dashboard/dashboard-links/dashboard-links.component';
import { PostSkillInfoComponent } from './Mittelungen/post-skill-info/post-skill-info.component';
import { UserCloseDialogComponent } from './Benutzerverwaltung/user-close-dialog/user-close-dialog.component';
import { SkillverwaltungCloseDialogComponent } from './Skillverwaltung/skillverwaltung-close-dialog/skillverwaltung-close-dialog.component';
import { DashboardCloseDialogComponent } from './Dashboard/dashboard-close-dialog/dashboard-close-dialog.component';
import { SkillverwaltungSkillstatusDialogComponent } from './Skillverwaltung/skillverwaltung-skillstatus-dialog/skillverwaltung-skillstatus-dialog.component';
import { HoldableDirective } from './Shared/Directive/holdable.directive';
import { EinstellungenComponent } from './Einstellungen/einstellungen/einstellungen.component';


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
    VermittlerChangeItemComponent,
    PostListComponent,
    PostComponent,
    PostListItemComponent,
    LogsComponent,
    LogsListComponent,
    SkillverwaltungSkillRemoveComponent,
    SelektierenComponent,
    SelektierenListComponent,
    SelektierenStatusChangeComponent,
    SkillverwaltungLinksComponent,
    SkillverwaltungLinksItemComponent,
    DashboardLinksComponent,
    PostSkillInfoComponent,
    UserCloseDialogComponent,
    SkillverwaltungCloseDialogComponent,
    DashboardCloseDialogComponent,
    SkillverwaltungSkillstatusDialogComponent,
    HoldableDirective,
    EinstellungenComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableExporterModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatGridListModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    NgxPrintModule,
    MsAdalAngular6Module.forRoot({
      tenant: '0a9e2776-62d5-46c5-9650-ec0cc551babf',
      clientId: 'df4e9ceb-596c-4ff5-b344-db62b0aab33d',
      redirectUri: 'https://anylearn.anyware.ag/anylearn/',
      // redirectUri: 'http://localhost:4200/',
      endpoints: {
        'https://graph.microsoft.com': 'df4e9ceb-596c-4ff5-b344-db62b0aab33d', // this is for feteching the access token
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: 'https://anylearn.anyware.ag/anylearn/logout',
    })
  ],
  providers: [AuthenticationGuard, PostService, MatDatepickerModule, MatNativeDateModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [BenutzerverwaltungUserItemComponent, SkillverwaltungSkillItemComponent, DashboardListItemComponent,
                    StatusChangeItemComponent, PostListItemComponent, SkillverwaltungSkillRemoveComponent, SelektierenStatusChangeComponent,
                    SkillverwaltungLinksComponent, SkillverwaltungLinksItemComponent, DashboardLinksComponent, PostSkillInfoComponent,
                    UserCloseDialogComponent, SkillverwaltungCloseDialogComponent, DashboardCloseDialogComponent,
                    SkillverwaltungSkillstatusDialogComponent]
})
export class AppModule {
}
