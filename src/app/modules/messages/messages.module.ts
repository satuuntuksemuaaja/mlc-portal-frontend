import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MessagesPageRoutingModule } from './messages-routing.module';
import { MessagesPage } from './messages.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClientsPageModule } from '../clients/clients.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesPageRoutingModule,
    ComponentsModule,
    CKEditorModule,
    ClientsPageModule
  ],
  declarations: [MessagesPage]
})
export class MessagesPageModule {}
