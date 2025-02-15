import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvalidOrganisationPageRoutingModule } from './invalid-organisation-routing.module';

import { InvalidOrganisationPage } from './invalid-organisation.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvalidOrganisationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InvalidOrganisationPage]
})
export class InvalidOrganisationPageModule {}
