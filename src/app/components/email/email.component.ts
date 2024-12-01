import { EmailDialogComponent } from './../dialog/email-dialog/email-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Email } from 'src/app/model/email.model';
import { EmailService } from 'src/app/service/email.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit{

  displayedColumns = ['email', 'imePrezime', 'naslov', 'poruka', 'datumVreme', 'actions'];

  emails!: MatTableDataSource<Email>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router, public service: EmailService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `${token}` } : {};
    this.service.getAllEmail(headers).subscribe( data => {
      this.emails = new MatTableDataSource(data);
      this.emails.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.emails.paginator = this.paginator;
      this.emails.sort = this.sort;
    });
  }

  public viewMessage(flag: number, id: number, naslov: string, poruka: string, imePrezime: string, email: string) {
    const dialog = this.dialog.open(EmailDialogComponent, {data: {id: id, naslov: naslov, poruka: poruka, imePrezime: imePrezime, email: email}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if(result ===1 ) {
        this.loadData();
      }
    })
  }
  
  public deleteDialog(flag: number, id: number, naslov: string, poruka: string, imePrezime: string, email: string) {
    const dialog = this.dialog.open(EmailDialogComponent, {data: {id: id, naslov: naslov, poruka: poruka, imePrezime: imePrezime, email: email}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if(result ===1 ) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim()
    filterValue = filterValue.toLowerCase();
    this.emails.filter = filterValue;
  }
 
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.snackBar.open('Odjavili ste se!', 'U redu', { duration: 2000 });
  }
}
