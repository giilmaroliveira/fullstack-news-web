import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { User } from '../_models/user.model';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['id','name','email','action'];
  usersList: User[] = [];

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  deleteUser(id: string) {
    this.usersService.delete(id).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Usuário excluído com sucesso');
        this.getAll();
        return;
      }
      this.notificationService.error('Erro ao excluir usuário');
    })
  }

  create(): void {
    this.router.navigate(['/users/create']);
  }

  private getAll(): void {
    this.usersService.getAll().subscribe(response => {
      this.usersList = response.data;
    });
  }

}
