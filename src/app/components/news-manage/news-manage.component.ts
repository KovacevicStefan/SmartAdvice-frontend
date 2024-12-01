import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { News } from 'src/app/model/news.model';
import { NewsService } from 'src/app/service/news.service';
import { NewsDialogComponent } from '../dialog/news-dialog/news-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-manage',
  templateUrl: './news-manage.component.html',
  styleUrls: ['./news-manage.component.scss']
})
export class NewsManageComponent {

  displayedColumns = ['naslov', 'autor', 'datum', 'actions'];

  news!: MatTableDataSource<News>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router, public service: NewsService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.service.getNewsByAuthorId().subscribe( data => {
      this.news = new MatTableDataSource(data);
      this.news.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.news.paginator = this.paginator;
      this.news.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naslov: string, autor: string, tekst: string) {
    const dialog = this.dialog.open(NewsDialogComponent, {data: {id: id, naslov: naslov, autor: autor, tekst: tekst.replace(/<br>/g, '\n')}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if(result === 1 ) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim()
    filterValue = filterValue.toLowerCase();
    this.news.filter = filterValue;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.snackBar.open('Odjavili ste se!', 'U redu', { duration: 2000 });
  }
}
