/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PdfViewerComponent } from 'src/app/components/pdf-viewer/pdf-viewer.component';
import { Popup, PopupService } from 'src/app/services/popup.service';
import { MeecoAttachment, MeecoItem, MeecoItemProps } from 'src/app/stores/files.repository';
import { takeUntil, Subject } from 'rxjs';
import { ImageViewerComponent } from 'src/app/components/image-viewer/image-viewer.component';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';
import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
import { SendFileComponent } from '../send-file/send-file.component';
import { FilesService } from 'src/app/services/files.service';
import { FilesRepository } from 'src/app/stores/files.repository';
import { FormsComponent } from '../forms/forms.component';
import { DefFactory } from '../model/common/DefFactory';
import { Client } from 'src/app/interfaces/clients.interface';
import { UtilityService } from 'src/app/services/utility.service';
import { createFileStore } from 'src/app/stores/files.repository';
import { FileTypes, TableStatus } from 'src/app/interfaces/File.interface';
import { createState, getRegistry, getStore, withProps } from '@ngneat/elf';
import { AttachmentStorageService } from 'src/app/services/attachment-storage.service';

@Component({
  selector: 'mlc-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedClient: Client;
  @Input() prevMode;

  pdfModal: HTMLIonModalElement;
  imageModal: HTMLIonModalElement;
  videoModal: HTMLIonModalElement;
  audioModal: HTMLIonModalElement;
  sendFileModal: HTMLIonModalElement;
  loadFormModal: HTMLIonModalElement;

  sentData: MeecoItem[];
  receivedData: MeecoItem[];

  receivedFileSubscription: any;
  sentFileSubscription: any;
  tempSentReceivedData: MeecoItemProps = {
    id: null,
    meccoItems: { meccoReceivedItems: null, meccoSentItems: null }
  };
  clientFileStoreProvider: { provide: typeof FilesRepository; useFactory(): FilesRepository };
  store: FilesRepository;
  createdStore: any;
  showSentTable: TableStatus;
  showReceivedTable: TableStatus;
  tempSentData: MeecoItem[];
  tempReceivedData: MeecoItem[];
  private readonly destroying$ = new Subject<void>();
  constructor(
    private modalCtrl: ModalController,
    private popupService: PopupService,
    private fileService: FilesService,
    private utilityService: UtilityService,
    private cacheService: AttachmentStorageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.selectedClient.isFirstChange()) {
      if (this.sentFileSubscription) {
        this.sentFileSubscription.unsubscribe();
      }
      if (this.receivedFileSubscription) {
        this.receivedFileSubscription.unsubscribe();
      }
      this.getClientStore(changes.selectedClient.currentValue.id);
      this.checkStoreAndGetData();
    }
  }

  ngOnInit() {
    // this.checkStoreAndGetData();
    if (this.selectedClient) {
      this.showSentTable = TableStatus.LOADING;
      this.showReceivedTable = TableStatus.LOADING;
      if (getStore(this.selectedClient?.id)) {
        this.setTableData();
        this.getClientSentFiles(this.selectedClient?.id);
        this.getClientReceivedData(this.selectedClient?.id);
      } else {
        if (this.prevMode !== undefined) {
          this.getClientSentFiles(this.selectedClient?.id);
          this.getClientReceivedData(this.selectedClient?.id);
        }
      }
      this.getPopupDetails();
    } else {
      this.showSentTable = TableStatus.BLANK;
      this.showReceivedTable = TableStatus.BLANK;
    }
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
  }

  checkStoreAndGetData() {
    this.showSentTable = TableStatus.LOADING;
    this.showReceivedTable = TableStatus.LOADING;
    if (getStore(this.selectedClient?.id)) {
      this.setTableData();
      this.getClientSentFiles(this.selectedClient?.id);
      this.getClientReceivedData(this.selectedClient?.id);
    } else {
      this.getClientSentFiles(this.selectedClient?.id);
      this.getClientReceivedData(this.selectedClient?.id);
    }
  }

  setTableData() {
    const store = getStore(this.selectedClient.id);
    store.subscribe((sentReceivedData) => {
      if (sentReceivedData.client) {
        this.tempSentData = this.sentData = sentReceivedData.client.meccoItems.meccoSentItems;
        this.tempReceivedData = this.receivedData =
          sentReceivedData.client.meccoItems.meccoReceivedItems;
      }
      if (this.sentData) {
        this.sentData.length <= 0
          ? (this.showSentTable = TableStatus.NO_DATA)
          : (this.showSentTable = TableStatus.SUCCESS);
      }
      if (this.receivedData) {
        this.receivedData.length <= 0
          ? (this.showReceivedTable = TableStatus.NO_DATA)
          : (this.showReceivedTable = TableStatus.SUCCESS);
      }
    });
  }

  getClientSentFiles(clientId: string) {
    if (!getStore(this.selectedClient?.id)) {
      this.showSentTable = TableStatus.LOADING;
      this.tempSentReceivedData.meccoItems.meccoSentItems = null;
    }
    this.sentFileSubscription = this.fileService.getClientFiles(clientId, 'sent').subscribe({
      next: (clientSentData: MeecoItem[]) => {
        if (!getStore(this.selectedClient?.id)) {
          this.tempSentReceivedData.meccoItems.meccoSentItems = clientSentData;
        } else {
          this.tempSentReceivedData.meccoItems.meccoSentItems = clientSentData;
          this.tempSentReceivedData.meccoItems.meccoReceivedItems = this.tempReceivedData;
        }
      },
      error: (err) => {
        this.showSentTable = TableStatus.ERROR;
      },
      complete: () => {
        if (!getStore(this.selectedClient.id)) {
          this.setNameTableData(this.tempSentReceivedData.meccoItems.meccoSentItems, 'sent');
          this.createClientStore();
        } else {
          this.setNameTableData(this.tempSentReceivedData.meccoItems.meccoSentItems, 'sent');
          this.updateClientStoreData();
        }
        this.setTableData();
      }
    });
  }

  createClientStore() {
    const { state, config } = createState(
      withProps<{ client: MeecoItemProps }>({
        client: {
          id: this.selectedClient.id,
          meccoItems: {
            meccoReceivedItems: this.tempSentReceivedData.meccoItems.meccoReceivedItems,
            meccoSentItems: this.tempSentReceivedData.meccoItems.meccoSentItems
          }
        }
      })
    );
    this.clientFileStoreProvider = createFileStore(this.selectedClient.id, state, config);
    this.store = this.clientFileStoreProvider.useFactory();
  }
  getClientStore(clientId: string) {
    this.createdStore = getStore(clientId);
  }

  updateClientStoreData() {
    const store = getStore(this.selectedClient.id);
    store.update((state) => ({
      ...state,
      client: {
        id: this.selectedClient.id,
        meccoItems: {
          meccoReceivedItems: this.tempSentReceivedData.meccoItems.meccoReceivedItems,
          meccoSentItems: this.tempSentReceivedData.meccoItems.meccoSentItems
        }
      }
    }));
  }

  getClientReceivedData(clientId: string) {
    if (!getStore(this.selectedClient?.id)) {
      this.showReceivedTable = TableStatus.LOADING;
      this.tempSentReceivedData.meccoItems.meccoReceivedItems = null;
    }
    this.receivedFileSubscription = this.fileService
      .getClientFiles(clientId, 'received')
      .subscribe({
        next: (clientReceivedData: MeecoItem[]) => {
          if (!getStore(this.selectedClient?.id)) {
            this.tempSentReceivedData.meccoItems.meccoReceivedItems = clientReceivedData;
          } else {
            this.tempSentReceivedData.meccoItems.meccoSentItems = this.tempSentData;
            this.tempSentReceivedData.meccoItems.meccoReceivedItems = clientReceivedData;
          }
        },
        error: (err) => {
          this.showReceivedTable = TableStatus.ERROR;
        },
        complete: () => {
          if (!getStore(this.selectedClient.id)) {
            this.setNameTableData(
              this.tempSentReceivedData.meccoItems.meccoReceivedItems,
              'received'
            );
            this.createClientStore();
          } else {
            this.setNameTableData(
              this.tempSentReceivedData.meccoItems.meccoReceivedItems,
              'received'
            );
            this.updateClientStoreData();
          }
          this.setTableData();
        }
      });
  }

  setNameTableData(sentReceivedClientData: MeecoItem[], direction: string) {
    sentReceivedClientData.map((data) => {
      data.values.map((fields) => {
        if (fields.k === 'name') {
          data.clientName = fields.v;
        }
      });
    });
    direction === 'sent'
      ? (this.tempSentReceivedData.meccoItems.meccoSentItems = sentReceivedClientData)
      : (this.tempSentReceivedData.meccoItems.meccoReceivedItems = sentReceivedClientData);
  }

  async openPdf(clientIdData: string, attachmentData: MeecoAttachment) {
    this.pdfModal = await this.modalCtrl.create({
      component: PdfViewerComponent,
      backdropDismiss: false,
      cssClass: 'large-modal',
      showBackdrop: false,
      componentProps: {
        clientId: clientIdData,
        attachment: attachmentData
      }
    });
    await this.pdfModal.present();
  }

  async openImage(clientIdData: string, attachmentData: MeecoAttachment) {
    this.imageModal = await this.modalCtrl.create({
      component: ImageViewerComponent,
      backdropDismiss: true,
      cssClass: 'large-modal',
      showBackdrop: true,
      componentProps: {
        clientId: clientIdData,
        attachment: attachmentData
      }
    });
    await this.imageModal.present();
  }

  async openVideo(clientIdData: string, attachmentData: MeecoAttachment) {
    this.videoModal = await this.modalCtrl.create({
      component: VideoPlayerComponent,
      backdropDismiss: false,
      cssClass: 'large-modal',
      showBackdrop: false,
      componentProps: {
        clientId: clientIdData,
        attachment: attachmentData
      }
    });
    await this.videoModal.present();
  }

  async openAudio(clientIdData: string, attachmentData: MeecoAttachment) {
    this.audioModal = await this.modalCtrl.create({
      component: AudioPlayerComponent,
      backdropDismiss: false,
      cssClass: 'large-modal',
      showBackdrop: false,
      componentProps: {
        clientId: clientIdData,
        attachment: attachmentData
      }
    });
    await this.audioModal.present();
  }

  async openSendFile() {
    this.sendFileModal = await this.modalCtrl.create({
      component: SendFileComponent,
      backdropDismiss: false,
      cssClass: 'send-file-modal',
      showBackdrop: false,
      componentProps: {
        client: this.selectedClient,
        sentFiles: this.sentData,
        receiveData: this.receivedData
      }
    });
    this.sendFileModal.present();
    await this.sendFileModal.onWillDismiss();
    this.setTableData();
  }

  getPopupDetails() {
    this.popupService.popupUpdated.pipe(takeUntil(this.destroying$)).subscribe((details: Popup) => {
      const a = details.title.split(' ');
      try {
        this[`${a[1]}${a[2]}`].dismiss();
      } catch (error) {
        console.log('log error');
      }
    });
  }

  loadDefinition(defination: string) {
    return DefFactory.getDefinition(defination);
  }

  pascalCaseToSentence(str: string) {
    if (str.length > 0) {
      let normalStr = '';
      let prevIndex = 0;
      let currentIndex = 0;
      for (let i = 0; i < str.length; i++) {
        currentIndex = i;
        if (str.charAt(i).match(/[A-Z]/) !== null && i !== 0) {
          normalStr += str.slice(prevIndex, currentIndex);
          normalStr += ' ';
          prevIndex = i;
        }
        if (str.length - 1 === i) {
          normalStr += str.slice(prevIndex, currentIndex + 1);
          return normalStr;
        }
      }
    }
  }

  setFormData(item: MeecoItem, defination: any) {
    for (let i = 0; i < item.values.length; i++) {
      defination.fields.map((field) => {
        if (item.values[i].k === field.fieldname) {
          field.value = item.values[i].v;
        }
      });
    }
  }

  async getDataInfo(label: string, item: MeecoItem) {
    const defination = this.loadDefinition(label);
    defination.fields.map((field) => {
      field.name = this.pascalCaseToSentence(field.name);
    });
    this.setFormData(item, defination);
    this.loadFormModal = await this.modalCtrl.create({
      component: FormsComponent,
      backdropDismiss: true,
      cssClass: 'send-file-modal',
      showBackdrop: true,
      componentProps: {
        fields: defination.fields,
        title: defination.name
      }
    });
    await this.loadFormModal.present();
  }

  openDoc(attachment: MeecoAttachment) {
    if (attachment.mime === 'application/pdf') {
      this.openPdf(this.selectedClient.id, attachment);
    }
    if (attachment.mime.startsWith('image/')) {
      this.openImage(this.selectedClient.id, attachment);
    }
    if (attachment.mime.startsWith('video/')) {
      this.openVideo(this.selectedClient.id, attachment);
    }
    if (attachment.mime.startsWith('audio/')) {
      this.openAudio(this.selectedClient.id, attachment);
    }
  }

  async convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  downloadFile(event, fileName: string, fileIndex: number, attachmentIndex: number) {
    event.stopPropagation();
    const attachment = this.sentData[fileIndex].attachments[attachmentIndex];
    attachment.isDownloading = true;
    this.cacheService
      .getFile(this.selectedClient.id, attachment.id)
      .then((blobData) => {
        this.convertBlobToBase64(blobData.value).then((fileDataBase64: any) =>
          this.utilityService.downloadBase64File(fileName, fileDataBase64)
        );
        attachment.isDownloading = false;
      })
      .catch(() => {
        this.fileService
          .getAttachment(this.selectedClient.id, attachment.itemId, attachment.id)
          .subscribe({
            next: (fileDataBlob) => {
              this.convertBlobToBase64(fileDataBlob).then((fileDataBase64: any) =>
                this.utilityService.downloadBase64File(fileName, fileDataBase64)
              );
              this.cacheService.addFile(
                fileDataBlob,
                attachment.id,
                this.selectedClient.id,
                FileTypes.Blob
              );
            },
            error: () => {
              this.utilityService.openAlert({
                title: 'Error',
                message: 'Error downloading file',
                type: 'error'
              });
              attachment.isDownloading = false;
            },
            complete: () => {
              attachment.isDownloading = false;
            }
          });
      });
  }
}
