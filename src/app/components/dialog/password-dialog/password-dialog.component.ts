import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public service: UserService
  ) { }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 2000 });
  }

  changePassword() {
    // Proveri da li nova lozinka i potvrda nove lozinke odgovaraju
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('Nove lozinke se ne poklapaju', 'U redu', { duration: 2000 });
      return;
    }

    const userId = this.service.getCurrentUserId(); // Metoda koja vraća trenutni ID korisnika
    this.service.updatePassword(userId, this.oldPassword, this.newPassword).subscribe({
      next: (response) => {
        console.log('Lozinka je uspešno promenjena');
        this.dialogRef.close();
        this.snackBar.open('Lozinka je uspešno promenjena', 'U redu', { duration: 2000 });
      },
      error: (error) => {
        console.error('Greška prilikom promene lozinke:', error);
        this.snackBar.open('Greška prilikom promene lozinke', 'U redu', { duration: 2000 });
      }
    });
  }
}
