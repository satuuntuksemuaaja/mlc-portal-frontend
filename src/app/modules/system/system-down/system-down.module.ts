import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SystemDownPageRoutingModule } from './system-down-routing.module';

import { SystemDownPage } from './system-down.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SystemDownPageRoutingModule],
  declarations: [SystemDownPage]
})
export class SystemDownPageModule {}
