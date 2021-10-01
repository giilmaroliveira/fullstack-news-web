import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Profile } from '../_models/profile.model';
import { User } from '../_models/user.model';
import { ProfilesService } from '../_services/profiles.service';
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
  profilesList: Profile[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private profilesService: ProfilesService,
    private router: Router,
    private route: ActivatedRoute) {
    this.usersForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile: ['', Validators.required],
      password: [''],
      confirmPassword: ['']
    });
    this.getAllProfiles();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.usersService.getById(id).subscribe(response => {
        this.usersModel = response.data;
        this.usersForm.patchValue({
          name: this.usersModel.name,
          lastname: this.usersModel.lastname,
          email: this.usersModel.email,
          profile: this.usersModel.profile._id
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

    const profileId = this.usersForm.controls['profile'].value;
    const profile = this.profilesList.find(p => p._id === profileId) as Profile;
    this.usersModel.profile = profile;

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
    if (!this.isPasswordFieldsValid()) {
      return;
    }

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

  private isPasswordFieldsValid(): boolean {
    const password = this.usersForm.controls['password'].value;
    const confirmPassword = this.usersForm.controls['confirmPassword'].value;

    if (password === '') {
      this.notificationService.warning('Campo senha é obrigatório');
      return false;
    }

    if (confirmPassword === '') {
      this.notificationService.warning('Campo confirmação de senha é obrigatório');
      return false;
    }

    if (password !== confirmPassword) {
      this.notificationService.warning('As senhas informadas não coincidem');
      return false;
    }

    return true;
  }

  private getAllProfiles(): void {
    this.profilesService.getAll().subscribe(response => {
      this.profilesList = response.data;
    });
  }

}
