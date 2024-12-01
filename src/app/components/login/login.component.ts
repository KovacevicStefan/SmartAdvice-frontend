import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
  
      this.userService.login(username, password).subscribe(
        (response) => {
          if (response.token) {
            const expirationTime = 3600000;
            localStorage.setItem('token', response.token);
            this.userService.setUser(response.user);
            this.router.navigate(['/profile']);
            this.snackBar.open('Uspešno ste se ulogovali!', 'U redu', { duration: 2000 });
  
            setTimeout(() => {
              this.logout();
            }, expirationTime);
          }
        },
        (error) => {
          this.snackBar.open('Neispravno korisničko ime ili lozinka! Pokušajte ponovo.', 'U redu', { duration: 2000 });
        }
      );
    }
  }
  
  logout() {
    localStorage.removeItem('token');
    this.userService.clearUser();
    this.router.navigate(['']);
    this.snackBar.open('Vaša sesija je istekla. Morate se ponovo ulogovati.', 'U redu', { duration: 2000 });
  }
  
}
