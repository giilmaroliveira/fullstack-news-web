import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['id','name','email'];
  usersList: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll().subscribe(response => {
      this.usersList = response.data;
    });
  }

}
