import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileSaverService } from 'ngx-filesaver';
import { FileTypes } from 'src/app/interfaces/File.interface';
import { AttachmentStorageService } from 'src/app/services/attachment-storage.service';
import { FilesService } from 'src/app/services/files.service';
import { PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MeecoAttachment } from 'src/app/stores/files.repository';

@Component({
  selector: 'mlc-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() modal;

  @Input() clientId: string;
  @Input() attachment: MeecoAttachment;
  @ViewChild('videoPlayer') videoplayer: any;
  @Input() poster: any | undefined;

  public show = false;
  public showLoading = true;
  public showError = false;

  fileBlob: any;
  filename: string | undefined = '';
  base64File: any;

  name = 'Video events';
  public startedPlay = false;
  videoSource: string;
  safeVideoSource: any;

  constructor(
    private popupService: PopupService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer,
    private utilityService: UtilityService,
    private fileSaverService: FileSaverService,
    private cacheService: AttachmentStorageService
  ) {}

  ngOnInit(): void {
    this.showLoading = true;
    this.meecoDownload();
  }

  getVideoFromCache() {
    return this.cacheService.getFile(this.clientId, this.attachment.id);
  }

  meecoDownload() {
    this.filename = this.attachment.name;
    const file = this.getVideoFromCache();
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
    this.videoSource = window.URL.createObjectURL(this.fileBlob);
    this.safeVideoSource = this.sanitizer.bypassSecurityTrustUrl(this.videoSource);
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
    this.popupService.setPopup({ confirm: true, title: 'Dismiss video Modal' });
  }

  downloadFile() {
    this.utilityService.downloadBase64File(this.filename, this.base64File);
  }
}
