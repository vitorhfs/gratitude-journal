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
  login: boolean;
  aud: string;

  constructor(
    public auth: AuthService,
    public route: Router,
    public userService: UserService
  ) { }

  ngOnInit() {        
    this.isLogged();
  }

  isLogged(){
    this.auth.isAuthenticated$.subscribe(confirm => {  
      this.login = confirm;
      if(this.login){
        this.validateUser();
      }
    })
  }

  getUserData(auth: string, username: string){
    this.userService.getUser(auth).subscribe(user => {          
      this.userService.user = user;
      if(user){
        this.route.navigate(['home']);
      }
    }, error => {      
      this.userService.postUser(auth, username)
      .subscribe(data =>{        
        this.userService.user = {
          userId: data.userCreated.id,
          username: data.userCreated.name
        }

        if(data){
          this.route.navigate(['home']);
        }
      })
    })
  }

  validateUser(){
    this.auth.user$.subscribe(data => {            
      if(data.sub){
        this.getUserData(data.sub, data.name)
      }
    })
  }
}