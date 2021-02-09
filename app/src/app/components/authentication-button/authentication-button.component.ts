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
  name: string;
  userId: string;

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
        this.auth.idTokenClaims$.subscribe(data => {
          this.verifyLoginExistence(data.aud)
        })
      }
    })
  }

  verifyLoginExistence(auth: string){
    this.userService.getUser(auth)
      .pipe(tap(
        data => {
          console.log(data);
        },
        error => {
          console.log(error.message)
        }
      ))
  }

}
