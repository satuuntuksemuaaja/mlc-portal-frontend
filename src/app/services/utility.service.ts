import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CustomAlertComponent } from '../components/custom-alert/custom-alert.component';
import { InfoPopupComponent } from '../components/info-popup/info-popup.component';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  popupDetails: {
    title: string;
    confirm: boolean;
  };
  loader: HTMLIonLoadingElement = null;

  constructor(
    private modalCtlrl: ModalController,
    private sanitize: DomSanitizer,
    private popoverCtrl: PopoverController,
    private loadingController: LoadingController
  ) {}

  public async openAlert({
    title,
    message,
    type,
    showCancel
  }: {
    title: string;
    message: string;
    type: 'error' | 'success';
    showCancel?: boolean;
  }): Promise<void> {
    const modal = await this.modalCtlrl.create({
      component: CustomAlertComponent,
      cssClass: 'custom-alert-modal',
      componentProps: { title, text: message, type, showCancel }
    });
    return await modal.present();
  }

  public async openConfirmation({
    title,
    message
  }: {
    title: string;
    message: string;
  }): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const modal = await this.modalCtlrl.create({
        component: ConfirmationDialogComponent,
        cssClass: 'confirmation-dialog',
        componentProps: { title, message }
      });
      await modal.present();

      const data = await modal.onDidDismiss();

      if (data?.role === 'confirm') {
        return resolve(true);
      } else {
        return reject(false);
      }
    });
  }

  public async showInfoPopup(ev: any, message: string) {
    const popover = await this.popoverCtrl.create({
      component: InfoPopupComponent,
      componentProps: {
        message
      },
      cssClass: 'info-popover',
      event: ev,
      backdropDismiss: true,
      showBackdrop: false,
      translucent: true
    });
    await popover.present();
  }

  public getSecureUrl(url: string) {
    return this.sanitize.bypassSecurityTrustUrl(url);
  }

  public b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    b64Data = b64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  public hideImageOnError(id: string) {
    const ele = document.getElementById(id);
    if (ele?.style) {
      ele.style.display = 'none';
    }
  }

  public async showLoader(msg) {
    this.loader = await this.loadingController.create({
      mode: 'md',
      message: msg,
      cssClass: 'custom-loading'
    });
    await this.loader.present();
    return;
  }
  public async hideLoader() {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
    return;
  }

  downloadBase64File(filename: string, sourceFile: any) {
    const downloadLink = document.createElement('a');
    const fileName = filename;
    downloadLink.href = sourceFile;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
