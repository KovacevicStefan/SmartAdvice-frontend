import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Email } from 'src/app/model/email.model';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit{

  public flag!: number;

constructor(public snackBar: MatSnackBar,
public dialogRef: MatDialogRef<EmailDialogComponent>,
@Inject(MAT_DIALOG_DATA) public data: Email,
public service: EmailService 
) { }

ngOnInit(): void {
}

public delete(): void {
const token = localStorage.getItem('token');
const headers = token ? { Authorization: `${token}` } : {};
this.service.deleteEmail(this.data, headers);
this.snackBar.open('Uspešno obrisana poruka ' + this.data.id, 'U redu', {duration: 2000});
}

public cancel(): void {
this.dialogRef.close();
}


}
