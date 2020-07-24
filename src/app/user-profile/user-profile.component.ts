import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  authenticated:any;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
