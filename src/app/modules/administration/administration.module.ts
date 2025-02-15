import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AgentsComponent } from './agents/agents.component';
import { ClientComponent } from './client/client.component';
import { AddAgentComponent } from './agents/add-agent/add-agent.component';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignClientComponent } from './agents/assign-client/assign-client.component';
import { AssignAgentComponent } from './client/assign-agent/assign-agent.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    AddAgentComponent,
    AgentsComponent,
    ClientComponent,
    AssignClientComponent,
    AssignAgentComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    IonicModule,
    ComponentsModule,
    AgGridModule,
    ReactiveFormsModule
  ]
})
export class AdministrationModule {}
