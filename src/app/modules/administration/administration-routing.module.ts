import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropAndRotateComponent } from 'src/app/components/crop-and-rotate/crop-and-rotate.component';
import { AdministrationComponent } from './administration.component';
import { AddAgentComponent } from './agents/add-agent/add-agent.component';
import { AssignClientComponent } from './agents/assign-client/assign-client.component';
import { AssignAgentComponent } from './client/assign-agent/assign-agent.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent
  },
  {
    path: 'add-agent',
    component: AddAgentComponent
  },
  {
    path: 'edit-image',
    component: CropAndRotateComponent
  },
  {
    path: 'assign-client/:id',
    component: AssignClientComponent
  },
  {
    path: 'assign-agent/:id',
    component: AssignAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
