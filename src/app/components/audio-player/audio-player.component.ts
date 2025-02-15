/* eslint-disable max-len */
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTypes } from 'src/app/interfaces/File.interface';
import { AttachmentStorageService } from 'src/app/services/attachment-storage.service';
import { FilesService } from 'src/app/services/files.service';
import { PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MeecoAttachment } from 'src/app/stores/files.repository';

@Component({
  selector: 'mlc-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  @Input() modal;

  @Input() clientId: string;
  @Input() attachment: MeecoAttachment;

  public show = false;
  public showLoading = true;
  public showError = false;

  fileBlob: any;
  filename: string | undefined = '';
  base64File: any;
  audioSource: string;
  safeAudioSource: any;

  constructor(
    private popupService: PopupService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer,
    private utilityService: UtilityService,
    private cacheService: AttachmentStorageService
  ) {}

  ngOnInit(): void {
    this.showLoading = true;
    this.meecoDownload();
  }

  getAudioFromCache() {
    return this.cacheService.getFile(this.clientId, this.attachment.id);
  }

  meecoDownload() {
    this.filename = this.attachment.name;
    const file = this.getAudioFromCache();
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
    this.audioSource = window.URL.createObjectURL(this.fileBlob);
    this.safeAudioSource = this.sanitizer.bypassSecurityTrustUrl(this.audioSource);

    this.showLoading = false;
    this.show = true;
    this.convertBlobToBase64(this.fileBlob).then((v) => (this.base64File = v));
  }

  convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  close() {
    this.popupService.setPopup({ confirm: true, title: 'Dismiss audio Modal' });
  }

  downloadFile() {
    this.utilityService.downloadBase64File(this.filename, this.base64File);
  }
}
