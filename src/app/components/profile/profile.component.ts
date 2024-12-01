import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { PasswordDialogComponent } from '../dialog/password-dialog/password-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User | null = null;

  constructor(private userService: UserService, public snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;

    });
  }

  openDialog() {
    const dialog = this.dialog.open(PasswordDialogComponent, {data: {}});
    dialog.afterClosed().subscribe(result => {
      if(result === 1 ) {
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.snackBar.open('Odjavili ste se!', 'U redu', { duration: 2000 });
  }
}
