import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilesPageRoutingModule } from './files-routing.module';
import { FilesPage } from './files.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClientsPageModule } from '../clients/clients.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilesPageRoutingModule,
    ComponentsModule,
    CKEditorModule,
    ClientsPageModule
  ],
  declarations: [FilesPage]
})
export class FilesPageModule {}
