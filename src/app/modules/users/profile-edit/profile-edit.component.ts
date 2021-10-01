import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Profile } from '../_models/profile.model';
import { ProfilesService } from '../_services/profiles.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profileForm: FormGroup;
  profileModel!: Profile;
  profileId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private profilesService: ProfilesService,
    private router: Router,
    private route: ActivatedRoute) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profileId = id;
      this.profilesService.getById(id).subscribe(response => {
        this.profileModel = response.data;
        this.profileForm.setValue({
          name: this.profileModel.name
        });
      });
    }
  }

  save(): void {
    if (this.profileForm.invalid === true) {
      this.notificationService.warning('Verifique os dados do formulário e tente novamente');
      return;
    }

    this.profileModel = Object.assign({}, this.profileForm.value);

    if (this.profileId !== '') {
      this.update();
    } else {
      this.create();
    }
  }

  returnToProfilesPage(): void {
    this.router.navigate(['/users/profiles']);
  }

  create(): void {
    this.profilesService.create(this.profileModel).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Perfil criado com sucesso');
        this.returnToProfilesPage();
        return;
      }
      this.notificationService.error('Erro ao criar perfil');
    });
  }

  update(): void {
    this.profilesService.update(this.profileId, this.profileModel).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Perfil atualizado com sucesso');
        this.returnToProfilesPage();
        return;
      }
      this.notificationService.error('Erro ao atualizar perfil');
    });
  }

}
