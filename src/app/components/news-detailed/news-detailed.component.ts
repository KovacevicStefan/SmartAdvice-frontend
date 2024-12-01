import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { News } from 'src/app/model/news.model';
import { NewsService } from 'src/app/service/news.service';
import { CommentDialogComponent } from '../dialog/comment-dialog/comment-dialog.component';
import { CookieService } from 'ngx-cookie-service'; // Uvezi CookieService
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-detailed',
  templateUrl: './news-detailed.component.html',
  styleUrls: ['./news-detailed.component.scss']
})
export class NewsDetailedComponent {
  newsItem?: News;
  comments?: any;
  replys?: any;
  num?: number = 0;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
    this.checkSnackbarMessage();
  }

  private getRouteParams(): void {
    this.route.params.subscribe((params) => {
      const naslov = params['naslov'];
      this.loadNews(naslov);
    });
  }

  private loadNews(naslov: string): void {
    this.newsService.getNewsByNaslov(naslov).subscribe((news) => {
      this.newsItem = news;
      this.loadComments(news.id);
    }, error => {
      console.error('Greška prilikom dobijanja vesti', error);
    });
  }

  private loadComments(newsId: number): void {
    this.newsService.getCommentsByNewsId(newsId).subscribe((comments) => {
      this.filterComments(comments);
      this.num = comments.length;
    }, error => {
      console.error('Greška prilikom dobijanja komentara', error);
    });
  }

  private filterComments(comments: any[]): void {
    this.replys = comments.filter((comment: any) => comment.replyTo !== null);
    this.comments = comments.filter((comment: any) => comment.replyTo === null);
  }

  public openDialog(flag: number, newsId: number, comment?: any, replyTo?: number, plus?: number, minus?: number): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: { flag: flag, newsId: newsId, replyTo: replyTo, comment: comment, plus: plus, minus: minus }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadComments(this.newsItem!.id);
      }
    });
  }  

  public addPlus(comment: any): void {
    
    const cookieName = `voted_${comment.id}`;
    if (this.cookieService.check(cookieName)) {
      this.showSnackBar('Već ste ocenili ovaj komentar.');
      return;
    }

    this.newsService.addPlus(comment);
    this.cookieService.set(cookieName, 'true', 7);

  }
  
  public addMinus(comment: any): void {
    const cookieName = `voted_${comment.id}`;

    if (this.cookieService.check(cookieName)) {
      this.showSnackBar('Već ste ocenili ovaj komentar.');
      return;
    }

    this.newsService.addMinus(comment);
    this.cookieService.set(cookieName, 'true', 7);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(`${message}`, 'U redu', { duration: 2000 });
  }

  public canEditOrDelete(comment: any): boolean {
    const cookieName = `comment_${comment.id}`;
    const commentTime = this.cookieService.get(cookieName);
  
    if (commentTime) {
      const commentDate = new Date(commentTime);
      const currentDate = new Date();
      
      const timeDifference = (currentDate.getTime() - commentDate.getTime()) / (1000 * 60);
      return timeDifference <= 15;
    }
  
    return false; // Ako nema kolačića, ne dozvoli uređivanje ili brisanje
  }

  private checkSnackbarMessage(): void {
    const message = localStorage.getItem('snackbarMessage');
    if (message) {
      this.showSnackBar(message);
      localStorage.removeItem('snackbarMessage');
    }
  }
}
