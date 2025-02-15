import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvalidOrganisationPage } from './invalid-organisation.page';

const routes: Routes = [
  {
    path: '',
    component: InvalidOrganisationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvalidOrganisationPageRoutingModule {}
