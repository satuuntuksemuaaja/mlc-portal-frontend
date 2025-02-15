import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { LoadingComponent } from './loading/loading.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { InvalidAuthComponent } from './auth/invalid/invalid.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropAndRotateComponent } from './crop-and-rotate/crop-and-rotate.component';
import { TableComponent } from './table/table.component';
import { InfoPopupComponent } from './info-popup/info-popup.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ActivityNotificationComponent } from './activity-notification/activity-notification.component';
import { ErrorComponent } from './error/error.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { FileSaverModule } from 'ngx-filesaver';
import { OfflinePopoverComponent } from './common-header/offline/offline-popover.component';

const COMPONENTS = [
  CommonHeaderComponent,
  OfflinePopoverComponent,
  SideBarComponent,
  ClientHeaderComponent,
  LoadingComponent,
  ErrorComponent,
  CustomAlertComponent,
  InvalidAuthComponent,
  FormInputsComponent,
  CropAndRotateComponent,
  TableComponent,
  InfoPopupComponent,
  ClientProfileComponent,
  ConfirmationDialogComponent,
  ActivityNotificationComponent,
  PdfViewerComponent,
  ImageViewerComponent,
  VideoPlayerComponent,
  AudioPlayerComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxExtendedPdfViewerModule,
    FileSaverModule
  ],
  exports: [...COMPONENTS]
})
export class ComponentsModule {}
