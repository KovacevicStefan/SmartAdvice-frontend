import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from 'src/app/model/service.model';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.scss']
})
export class ServicesDialogComponent {

  public flag!: number;

constructor(public snackBar: MatSnackBar,
public dialogRef: MatDialogRef<ServicesDialogComponent>,
@Inject(MAT_DIALOG_DATA) public data: Service,
public service: ServicesService 
) { }

ngOnInit(): void {
}

public add(): void {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `${token}` } : {};
  this.service.addNews(this.data, headers);
  this.snackBar.open('Uspešno dodata usluga ' + this.data.text, 'U redu', {duration: 2000});
}

public update(): void {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `${token}` } : {};
  this.service.updateNews(this.data, headers);
  this.snackBar.open('Uspešno izmenjena usluga ' + this.data.text, 'U redu', {duration: 2000});
}

public delete(): void {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `${token}` } : {};
  this.service.deleteService(this.data, headers);
  this.snackBar.open('Uspešno obrisana usluga ' + this.data.text, 'U redu', {duration: 2000});
}

public cancel(): void {
  this.dialogRef.close();
  this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
}

}
