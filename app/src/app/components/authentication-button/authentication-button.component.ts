import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styleUrls: ['./authentication-button.component.scss'],
})
export class AuthenticationButtonComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public route: Router,
    public userService: UserService
  ) { }

  ngOnInit() {    
    this.isLogged();
  }

  isLogged(){
    this.auth.isAuthenticated$.subscribe(data => {
      if(data){
        console.log(this.auth.user$);
        this.route.navigate(['home']);
      }
    })
  }

  verifyLoginExistence(){
    this.auth.user$    
  }

}
