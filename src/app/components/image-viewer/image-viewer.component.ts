import { Component, OnInit, Input } from '@angular/core';
import { FileTypes } from 'src/app/interfaces/File.interface';
import { AttachmentStorageService } from 'src/app/services/attachment-storage.service';
import { FilesService } from 'src/app/services/files.service';
import { PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MeecoAttachment } from 'src/app/stores/files.repository';

@Component({
  selector: 'mlc-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() clientId: string;
  @Input() attachment: MeecoAttachment;

  showLoading = true;
  showError = false;

  showImage = false;
  fileBlob: any;
  filename: string | undefined = '';
  base64File: any;
  url: string;

  constructor(
    private popupService: PopupService,
    private filesService: FilesService,
    private utilityService: UtilityService,
    private cacheService: AttachmentStorageService
  ) {}

  ngOnInit(): void {
    this.showLoading = true;
    this.meecoDownload();
  }

  getImageFromCache() {
    return this.cacheService.getFile(this.clientId, this.attachment.id);
  }

  meecoDownload() {
    this.filename = this.attachment.name;
    const file = this.getImageFromCache();
    file
      .then((data) => {
        this.fileBlob = data.value;
        this.afterViewComplete();
      })
      .catch(() => {
        this.filesService
          .getAttachment(this.clientId, this.attachment.itemId, this.attachment.id)
          .subscribe({
            next: (blob: Blob) => {
              this.fileBlob = blob;
              this.cacheService.addFile(
                this.fileBlob,
                this.attachment.id,
                this.clientId,
                FileTypes.Blob
              );
            },
            error: () => {
              this.showLoading = false;
              this.showError = true;
            },
            complete: () => {
              this.afterViewComplete();
            }
          });
      });
  }

  afterViewComplete() {
    this.url = window.URL.createObjectURL(this.fileBlob);
    this.showLoading = false;
    this.showImage = true;
    this.convertBlobToBase64(this.fileBlob).then((v) => (this.base64File = v));
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

  downloadFile() {
    this.utilityService.downloadBase64File(this.filename, this.base64File);
  }

  close() {
    this.popupService.setPopup({ confirm: true, title: 'Dismiss image Modal' }); // FIXME: very loose method to close popup
  }
}
