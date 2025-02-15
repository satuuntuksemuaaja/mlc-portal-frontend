import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemDownPage } from './system-down.page';

const routes: Routes = [
  {
    path: '',
    component: SystemDownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemDownPageRoutingModule {}
