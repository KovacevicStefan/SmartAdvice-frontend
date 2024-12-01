import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { News } from 'src/app/model/news.model';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit{
  public flag!: number;

constructor(public snackBar: MatSnackBar,
public dialogRef: MatDialogRef<NewsDialogComponent>,
@Inject(MAT_DIALOG_DATA) public data: News,
public service: NewsService 
) { }

ngOnInit(): void {
}

public add(): void {
  const token = localStorage.getItem('token');
const headers = token ? { Authorization: `${token}` } : {};
this.service.addNews(this.data, headers);
this.snackBar.open('Uspešno dodat članak ' + this.data.naslov, 'U redu', {duration: 2000});
}

public update(): void {
const token = localStorage.getItem('token');
const headers = token ? { Authorization: `${token}` } : {};
this.service.updateNews(this.data, headers);
this.snackBar.open('Uspešno izmenjen članak ' + this.data.naslov, 'U redu', {duration: 2000});
}

public delete(): void {
const token = localStorage.getItem('token');
const headers = token ? { Authorization: `${token}` } : {};
this.service.deleteNews(this.data, headers);
this.snackBar.open('Uspešno obrisan članak ' + this.data.naslov, 'U redu', {duration: 2000});
}

public cancel(): void {
this.dialogRef.close();
this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
}

}
