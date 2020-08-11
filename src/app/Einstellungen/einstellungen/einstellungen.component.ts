import { OptionsService } from './../../Shared/Services/options.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.css']
})
export class EinstellungenComponent implements OnInit {

  checked;

  constructor(public optionsService: OptionsService, private snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userid'));
    this.optionsService.getOptions(userId).subscribe(data => {
      if (data[0]['mail_setting'] === 0)
      {
        this.checked = false;
      }
      else
      {
        this.checked = true;
      }
    });
  }

  onMailActivate() {
    const userId = parseInt(localStorage.getItem('userid'));
    const mailOption: Array<{mail_setting: number, user_id: number}> = [{mail_setting: 1, user_id: userId}];
    this.optionsService.updateMailOption(mailOption[0]).subscribe(data => {
      this.openGreenSnackBar('Einstellung erfolgreich geändert!', 'Schließen');
      localStorage.setItem('mailSetting', '1');
    }, error => {
      this.openRedSnackBar('Fehlgeschlagen!', 'Schließen');
    });
  }

  onMailDisable() {
    const userId = parseInt(localStorage.getItem('userid'));
    const mailOption: Array<{mail_setting: number, user_id: number}> = [{mail_setting: 0, user_id: userId}];
    this.optionsService.updateMailOption(mailOption[0]).subscribe(data => {
      this.openGreenSnackBar('Einstellung erfolgreich geändert!', 'Schließen');
      localStorage.setItem('mailSetting', '0');
    }, error => {
      this.openRedSnackBar('Fehlgeschlagen!', 'Schließen');
    });
  }

  openGreenSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['green-snackbar']});
  }

  openRedSnackBar(message, action) {
    this.snackbar.open(message, action, {duration: 2000, panelClass: ['red-snackbar']});
  }

}
