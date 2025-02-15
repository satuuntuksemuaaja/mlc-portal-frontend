import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentSettingsPageRoutingModule } from './agent-settings-routing.module';

import { AgentSettingsPage } from './agent-settings.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentSettingsPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [AgentSettingsPage]
})
export class AgentSettingsPageModule {}
