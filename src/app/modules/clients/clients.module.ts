import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FilesComponent } from './files/files.component';
import { SendFileComponent } from './send-file/send-file.component';
import { FormsComponent } from './forms/forms.component';
import { ItemTitlePipe } from './forms/itemtitle.pipe';
import { MessageSeparatorPipe } from './message-separator.pipe';
import { MessageListComponent } from './message-list/message-list.component';
import { DateSuffixPipe } from 'src/app/utils/DataSuffixPipe';
import { DateSuffixPipe1 } from 'src/app/utils/DateSuffixPipe1';
import { SafeHtmlPipe } from 'src/app/utils/SafeHtmlPipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsPageRoutingModule,
    CKEditorModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClientsPage,
    FilesComponent,
    SendFileComponent,
    FormsComponent,
    ItemTitlePipe,
    MessageSeparatorPipe,
    MessageListComponent,
    DateSuffixPipe,
    DateSuffixPipe1,
    SafeHtmlPipe
  ],
  exports: [MessageSeparatorPipe, MessageListComponent, FilesComponent],
  entryComponents: [MessageSeparatorPipe, MessageListComponent]
})
export class ClientsPageModule {}
