/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FilesService } from 'src/app/services/files.service';
import { Popup, PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MeecoItem } from 'src/app/stores/files.repository';
import { Client } from 'src/app/interfaces/clients.interface';

@Component({
  selector: 'mlc-send-file',
  templateUrl: './send-file.component.html',
  styleUrls: ['./send-file.component.scss']
})
export class SendFileComponent implements OnInit, OnDestroy {
  @Input() client: Client;
  @Input() sentFiles: MeecoItem[];
  @Input() receiveData: MeecoItem[];
  btnCount = 1;
  uploadIds = ['1'];
  data = [];
  title: string;
  sendFileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    notes: new FormControl(),
    files: new FormControl(this.data)
  });

  showLoader = true;
  loadingText: string | 'Creating Client';
  createItemResponse: { itemid: string; shareid: string };
  saveSentData: MeecoItem;
  private readonly destroying$ = new Subject<void>();
  values: Partial<{ name: string; notes: any; files: any[] }>;
  constructor(
    private popupService: PopupService,
    private fileService: FilesService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.title = `Send Documents to ${this.client.name}`;
    this.getPopupDetails();
    this.showLoader = false;
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
  }

  close() {
    this.popupService.setPopup({ confirm: true, title: 'Dismiss sendFile Modal' });
    if (this.showLoader && this.createItemResponse.itemid) {
      this.fileService.cleanUpFiles(this.client.id, this.createItemResponse.itemid).subscribe({
        next: () => {},
        complete: () => {
          this.showLoader = false;
          this.utilityService.openAlert({
            title: 'Error',
            message: 'Error Uploading Documents',
            type: 'error'
          });
        }
      });
    }
  }

  send() {
    this.showLoader = true;
    this.loadingText = 'Processing';
    this.values = this.sendFileForm.value;
    this.fileService
      .createItem(this.client.id, { name: this.values.name, notes: this.values.notes })
      .subscribe({
        next: (data: { itemid: string; shareid: string }) => {
          this.title = 'Creating Vault Item';
          this.loadingText = 'Processing';
          this.createItemResponse = data;
        },
        error: () => {
          this.showLoader = false;
          this.close();
          this.utilityService.openAlert({
            title: 'Error',
            message: 'Error Uploading Documents',
            type: 'error'
          });
        },
        complete: () => {
          this.showLoader = false;
          this.popupService.setPopup({ confirm: true, title: '0' });
        }
      });
  }

  getPopupDetails() {
    this.popupService.popupUpdated.pipe(takeUntil(this.destroying$)).subscribe((details: Popup) => {
      if (
        (details.confirm === true && details.title === '0') ||
        details.title === '1' ||
        details.title === '2' ||
        details.title === '3' ||
        details.title === '4'
      ) {
        this.sendFiles(this.createItemResponse.itemid, details.title);
      }
    });
  }

  sendFiles(itemId: string, itemNo: string) {
    this.showLoader = true;
    if (this.data.length > 0) {
      this.title = `Uploading Document ${parseInt(itemNo, 10) + 1}/${this.data.length}`;
      this.loadingText = 'Uploading ' + this.data[itemNo].name;

      this.fileService.sendFile(this.client.id, itemId, this.data[itemNo]).subscribe({
        next: (savedData: MeecoItem) => {
          this.saveSentData = savedData;
        },
        error: () => {
          this.fileService.cleanUpFiles(this.client.id, itemId).subscribe({
            next: () => {},
            complete: () => {
              this.showLoader = false;
              this.utilityService.openAlert({
                title: 'Error',
                message: 'Error Uploading Documents',
                type: 'error'
              });
            }
          });
        },
        complete: () => {
          const nextIndex = parseInt(itemNo, 10) + 1;
          if (nextIndex < this.data.length) {
            this.popupService.setPopup({ confirm: true, title: nextIndex.toString() });
          } else {
            this.completeSend();
          }
        }
      });
    }
  }

  completeSend() {
    this.showLoader = true;
    this.title = 'Sharing Securely';
    this.loadingText = 'Your file is now being shared securely with' + this.client.name;
    this.fileService.completeSendFile(this.client.id, this.createItemResponse.itemid).subscribe({
      next: () => {},
      error: () => {
        this.fileService.cleanUpFiles(this.client.id, this.createItemResponse.itemid).subscribe({
          next: () => {},
          complete: () => {
            this.showLoader = false;
            this.utilityService.openAlert({
              title: 'Error',
              message: 'Error Uploading Documents',
              type: 'error'
            });
          }
        });
      },
      complete: () => {
        this.saveSentData.values.map(data => {
          if(data.k === 'name'){
            this.saveSentData.clientName = data.v;
          }
        });
        this.sentFiles.push(this.saveSentData);
        this.showLoader = false;
        this.utilityService.openAlert({
          title: 'Sent!',
          message:
            (this?.values?.name ? this?.values?.name : 'Item') +
            ' shared with ' +
            this.client?.name,
          type: 'success'
        });
        this.close();
      }
    });
  }

  clickInput() {
    document.getElementById('1').click();
  }

  checkDuplicateFile(fileName: string): boolean {
    if (this.data.length > 0) {
      for (const file of this.data) {
        if (file.name === fileName) {
          return true;
        }
      }
    }
    return false;
  }

  fileUploadClick(_event) {
    const file = _event.target.files[0];
    if (
      this.btnCount < 6 &&
      file &&
      !this.checkDuplicateFile(file.name) &&
      file.size <= 104857600
    ) {
      this.data.push(file);
      if (this.btnCount < 5) {
        this.uploadIds.push(this.btnCount.toString());
        this.btnCount++;
      }
    }
  }
}
