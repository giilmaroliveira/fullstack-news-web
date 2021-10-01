import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'create',
    component: UsersEditComponent
  },
  {
    path: 'edit/:id',
    component: UsersEditComponent
  },
  {
    path: 'profiles',
    component: ProfileComponent
  },
  {
    path: 'profile/create',
    component: ProfileEditComponent
  },
  {
    path: 'profile/edit/:id',
    component: ProfileEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
