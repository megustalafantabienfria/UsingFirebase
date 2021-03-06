import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import * as M from 'materialize-css';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public userService: UserService) {}

  ngOnInit() {
    $(document).ready(
      () => $('.dropdown-trigger').dropdown()
    );
  }

  logOut() {
    this.userService.logOut();
    M.toast({ html: `You have successfully logged out!` });
  }

}
