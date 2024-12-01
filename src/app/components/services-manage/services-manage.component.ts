import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Service } from 'src/app/model/service.model';
import { ServicesService } from 'src/app/service/services.service';
import { NewsDialogComponent } from '../dialog/news-dialog/news-dialog.component';
import { ServicesDialogComponent } from '../dialog/services-dialog/services-dialog.component';

@Component({
  selector: 'app-services-manage',
  templateUrl: './services-manage.component.html',
  styleUrls: ['./services-manage.component.scss']
})
export class ServicesManageComponent {

  displayedColumns = ['text', 'slika', 'actions'];

  services!: MatTableDataSource<Service>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public router: Router,public service: ServicesService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.service.getAllServices().subscribe( data => {
      this.services = new MatTableDataSource(data);
      this.services.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.services.paginator = this.paginator;
      this.services.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue.trim()
    filterValue = filterValue.toLowerCase();
    this.services.filter = filterValue;
  }

  public openDialog(flag: number, id: number, text: string, slika: string) {
    const dialog = this.dialog.open(ServicesDialogComponent, {data: {id: id, text: text, slika: slika}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if(result === 1 ) {
        this.loadData();
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.snackBar.open('Odjavili ste se!', 'U redu', { duration: 2000 });
  }

}
