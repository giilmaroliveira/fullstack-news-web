import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { User } from '../_models/user.model';
import { UsersService } from '../_services/users.service';
@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  usersForm: FormGroup;
  usersModel!: User;
  userId: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute) {
    this.usersForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.usersService.getById(id).subscribe(response => {
        this.usersModel = response.data;
        this.usersForm.setValue({
          name: this.usersModel.name,
          lastname: this.usersModel.lastname,
          email: this.usersModel.email,
          password: ''
        });
      });
    }
  }

  save(): void {
    if (this.usersForm.invalid === true) {
      this.notificationService.warning('Verifique os dados do formulário e tente novamente');
      return;
    }

    this.usersModel = Object.assign({}, this.usersForm.value);

    if (this.userId !== '') {
      this.update();
    } else {
      this.create();
    }
  }

  returnToUsersPage(): void {
    this.router.navigate(['/users']);
  }

  create(): void {
    this.usersService.create(this.usersModel).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Usuário criado com sucesso');
        this.returnToUsersPage();
        return;
      }
      this.notificationService.error('Erro ao criar o usuário');
    });
  }

  update(): void {
    this.usersService.update(this.userId, this.usersModel).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Usuário atualizado com sucesso');
        this.returnToUsersPage();
        return;
      }
      this.notificationService.error('Erro ao atualizar o usuário');
    });
  }

}
