import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvalidUserComponent } from './invalid-user.component';
import { InvalidUserPageRoutingModule } from './invalid-user-routing.module';



@NgModule({
  declarations: [
    InvalidUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    InvalidUserPageRoutingModule
  ]
})
export class InvalidUserModule { }
