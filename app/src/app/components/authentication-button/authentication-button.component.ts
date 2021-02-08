import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styleUrls: ['./authentication-button.component.scss'],
})
export class AuthenticationButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    console.log(this.auth.user$.subscribe(
      e => console.log(e)      
    ));
    
  }

}
