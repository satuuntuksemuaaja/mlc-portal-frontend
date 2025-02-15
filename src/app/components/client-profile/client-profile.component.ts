import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/clients.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ValidationHelper } from 'src/app/utils/validation-helper';

@Component({
  selector: 'mlc-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit, OnChanges {
  @Input() client: Client = null;
  @Output() doRefresh: EventEmitter<boolean> = new EventEmitter();
  @Output() updateClient: EventEmitter<Client> = new EventEmitter();
  clientForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private utilityService: UtilityService
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
      phone: ['', [...ValidationHelper.phoneValidationRules]],
      created: [{ value: '', disabled: true }, [Validators.required]],
      ref: [],
      notes: []
    });
  }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    const datePipe = new DatePipe('en-US');
    const createdDate = this.getDate();
    this.clientForm.patchValue({
      ...this.client,
      created: this.client?.created ? datePipe.transform(createdDate.getTime(), 'dd/MM/yyyy') : ''
    });
  }

  ngOnChanges() {
    this.setupForm();
  }

  getDate() {
    if (this.client?.created) {
      return new Date(this.client.created);
    }
  }
  archive() {
    const userName = this.getFirstName();
    const message = `Are you sure you want to archive
    <b>${this.client.name} ?</b> <br>
    ${userName}’s subscription will not renew once it expires.`;

    this.utilityService
      .openConfirmation({
        message,
        title: 'Archive Client'
      })
      .then(async () => {
        await this.utilityService.showLoader('Archive Client');
        this.clientService.archiveClient(this.client.id).subscribe({
          next: (data: any) => {
            if (data?.id) {
              this.doRefresh.emit(true);
              this.updateSelected(data);
            }
            this.utilityService.hideLoader();
          },
          error: (e) => {
            console.log('archiveClient error --- ', e);
            this.utilityService.hideLoader();
          }
        });
      })
      .catch(() => {});
  }

  restore() {
    const userName = this.getFirstName();
    const message = `Are you sure you want to restore
    <b>${this.client.name} ?</b> <br>
    ${userName}’s subscription will re-activate if expired.`;
    this.utilityService
      .openConfirmation({
        message,
        title: 'Restore Client'
      })
      .then(async () => {
        await this.utilityService.showLoader('Restore Client');
        this.clientService.restoreClient(this.client.id).subscribe({
          next: (data: any) => {
            if (data?.id) {
              this.doRefresh.emit(true);
              this.updateSelected(data);
            }
            this.utilityService.hideLoader();
          },
          error: (e) => {
            console.log('restoreClient error --- ', e);
            this.utilityService.hideLoader();
          }
        });
      })
      .catch(() => {});
  }
  cancel() {
    this.setupForm();
  }

  cancelRequest() {
    // const userName = this.getFirstName();
    const message = `Are you sure you want to cancel
    <b>${this.client.name} ?</b> <br>
    This will cancel their pending connection & subscription.`;
    this.utilityService
      .openConfirmation({
        message,
        title: 'Cancel Client'
      })
      .then(async () => {
        await this.utilityService.showLoader('Cancel Client');
        this.clientService.cancelClientRequest(this.client.id).subscribe({
          next: (data: any) => {
            if (data?.id) {
              this.doRefresh.emit(true);
              this.updateSelected(data);
            }
            this.utilityService.hideLoader();
          },
          error: (e) => {
            console.log('cancelClientRequest error --- ', e);
            this.utilityService.hideLoader();
          }
        });
      })
      .catch(() => {});
  }


  reinviteRequest() {
    const message = `Re-Invite Client
    <b>${this.client.name} ?</b> <br>
    They will have 14 days to accept your invitation.`;
    this.utilityService
      .openConfirmation({
        message,
        title: 'Re-Invite Client'
      })
      .then(async () => {
        await this.utilityService.showLoader('Re-Invite Client');
        this.clientService.reInviteClient(this.client.id).subscribe({
          next: (data: any) => {
            if (data?.id) {
              this.doRefresh.emit(true);
              this.updateSelected(data);
            }
            this.utilityService.hideLoader();
          },
          error: (e) => {
            console.log('reInviteClient error --- ', e);
            this.utilityService.hideLoader();
          }
        });
      })
      .catch(() => {});
  }

  async save() {
    const client = {
      name: this.clientForm.value?.name,
      ref: this.clientForm.value?.ref,
      notes: this.clientForm.value?.notes,
      id: this.client.id,
      phone: this.clientForm.value?.phone
    };
    await this.utilityService.showLoader('Saving');
    this.clientService.updateClient(client).subscribe({
      next: (data: any) => {
        if (data?.id) {
          // this.doRefresh.emit(true);
          this.client = { ...this.client, ...client };
          this.updateClient.emit(this.client);
        }
        this.utilityService.hideLoader();
      },
      error: (e) => {
        console.log('update client error --- ', e);
        this.utilityService.hideLoader();
      }
    });
  }

  private getFirstName() {
    return this.client?.name?.split(' ')[0];
  }

  private updateSelected(client) {
    this.client = { ...this.client, ...client };
  }
}
