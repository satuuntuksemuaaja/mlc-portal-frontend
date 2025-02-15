import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvalidUserComponent } from './invalid-user.component';

const routes: Routes = [
  {
    path: '',
    component: InvalidUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvalidUserPageRoutingModule {}
