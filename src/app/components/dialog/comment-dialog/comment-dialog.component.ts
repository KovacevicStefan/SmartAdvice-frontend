import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsService } from 'src/app/service/news.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent {
  public flag!: number;

  public commentData;

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private newsService: NewsService,
    private cookieService: CookieService // Dodaj servis za rad sa kolačićima
  ) {
    this.commentData = {
      id: data.id = data.comment.id,
      imePrezime: data.comment ? data.comment.imePrezime : '',
      text: data.comment ? data.comment.text : '',
      newsId: data.newsId,
      replyTo: data.replyTo,
      plus: data.plus,
      minus: data.minus
    };
  }

  public postComment(form: any): void {
    if (form.valid) {
        this.newsService.addComment(this.commentData).subscribe(
          (response: any) => {
              const cookieName = `comment_${response.id}`;
              const expirationTime = new Date();
              expirationTime.setMinutes(expirationTime.getMinutes() + 15);
              this.cookieService.set(cookieName, new Date().toISOString(), { expires: expirationTime });
              this.dialogRef.close(1);
              this.snackBar.open('Uspešno ste dodali komentar. Brisanje i uređivanje je aktivno u narednih 15 minuta.', 'U redu', { duration: 3000 });
            },
            error => {
              console.error('Greška prilikom dodavanja komentara', error);
            }
          );
    }
  }

  public putComment(): void {
    this.newsService.updateComment(this.commentData);
    this.dialogRef.close(1);
    this.snackBar.open('Uspešno ste izmenili komentar.', 'U redu', { duration: 2000 });
  }

  public deleteComment(): void {
    this.newsService.deleteComment(this.commentData);
    this.dialogRef.close(1);
    this.snackBar.open('Uspešno ste obrisali komentar.', 'U redu', { duration: 2000 });
  }
}
