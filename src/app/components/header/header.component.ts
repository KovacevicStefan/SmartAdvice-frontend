import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoginComponent],
})
export class HeaderComponent implements OnInit {

user: User | null = null;

constructor(private userService: UserService) {}

getLoginInfo() {
  const token = localStorage.getItem('token');

  if(token) {
    return true;
  } else {
    return false;
  }
}

ngOnInit() {
  this.userService.user$.subscribe(user => {
    this.user = user;
  });
}

}
