import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Profile } from '../_models/profile.model';
import { ProfilesService } from '../_services/profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns = ['id', 'name', 'action'];
  profilesList: Profile[] = [];

  constructor(
    private profilesService: ProfilesService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  deleteUser(id: string) {
    this.profilesService.delete(id).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Perfil excluído com sucesso');
        this.getAll();
        return;
      }
      this.notificationService.error('Erro ao excluir perfil');
    })
  }

  create(): void {
    this.router.navigate(['/users/profile/create']);
  }

  private getAll(): void {
    this.profilesService.getAll().subscribe(response => {
      this.profilesList = response.data;
    });
  }

}
