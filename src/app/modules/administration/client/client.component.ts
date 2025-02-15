/* eslint-disable max-len */
import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ColDef } from 'ag-grid-community';
import {
  ActiveClients,
  Client,
  ClientAgent,
  ClientsAgent,
  SubscriptionHistory
} from 'src/app/interfaces/clients.interface';
import { ClientSubscription } from 'src/app/interfaces/clients.interface';
import { AgentService } from 'src/app/services/agent.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Popup, PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ValidationHelper } from 'src/app/utils/validation-helper';
import { takeUntil, Subject } from 'rxjs';
import { AddClientPage } from '../../clients/add-client/add-client.page';
import { AssignAgentComponent } from './assign-agent/assign-agent.component';

@Component({
  selector: 'mlc-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  clientList: Client[];
  selectedClient;
  isArchived = false;
  showLoading = false;
  viewMode = 'settings';
  public columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Agent', width: 150 },
    {
      field: 'email',
      headerName: 'Email',
      cellStyle: { color: '#66788A', fontWeight: 'bold', width: 240 }
    },
    { field: 'created', headerName: 'Assigned', width: 120 },
    {
      field: 'remove',
      headerName: ' ',
      onCellClicked: (e) => {
        this.removeClient(e.data);
      },
      cellStyle: { cursor: 'pointer' },
      width: 90
    }
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };
  agentTableData: ClientAgent[] | [] = [];
  public clientSubcriptionDefs: ColDef[] = [
    {
      field: 'status', //need to change key
      headerName: 'STATUS',
      cellStyle: (params) => {
        if (params.value === 'Active') {
          //mark Active cells as green
          return { color: 'green' };
        } else {
          return { color: 'red' };
        }
      }
    },
    { field: 'start', headerName: 'START' },
    { field: 'end', headerName: 'FINISH' }
  ];

  clientSubscriptionData: SubscriptionHistory[] | [] = [];

  public clientForm: FormGroup;
  removeAgent: any;
  agentLoading = false;
  private readonly destroying$ = new Subject<void>();

  constructor(
    private clientsService: ClientsService,
    private utilityService: UtilityService,
    private popupService: PopupService,
    private formBuilder: FormBuilder,
    private agentService: AgentService,
    private modalCtrl: ModalController
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
      phone: ['', [...ValidationHelper.phoneValidationRules]],
      created: [{ value: '', disabled: true }, [Validators.required]],
      ref: [''],
      notes: ['']
    });
  }

  ngOnInit() {
    this.getAllClients();
    this.getPopupDetails();
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
  }

  getClientSubscription(id: string) {
    this.clientsService.getSubscription(id).subscribe({
      next: (clientSubs: ClientSubscription) => {
        if (clientSubs === undefined) {
          return;
        } else {
          clientSubs.subscriptionhistory.map((client) => {
            client.status = new Date(client.end) > new Date()? 'Active' : 'Expired';
            client.start = new Date(client.start).toLocaleDateString('en-us', { day:'numeric', year:'numeric', month:'short'}).replace(',','');
            client.end = new Date(client.end).toLocaleDateString('en-us', { day:'numeric', year:'numeric', month:'short'}).replace(',','');
          });
          this.clientSubscriptionData = clientSubs.subscriptionhistory;
        }
      }
    });
  }

  getClientAgents(id: string) {
    this.agentLoading = true;
    this.clientsService.getAgents(id).subscribe({
      next: (agentData: ClientsAgent) => {
        if (agentData === undefined) {
          return;
        } else {
          this.agentTableData = agentData.agents;
          this.agentTableData.forEach((agent: any) => {
            const datePipe = new DatePipe('en');
            agent.created = datePipe.transform(agent?.created, 'MMM d, y h:mm');
            agent.remove = 'Remove';
          });
        }
        this.agentLoading = false;
      },
      error: () => {
        this.agentLoading = false;
      }
    });
  }

  openMessage(_event) {
    this.selectedClient = _event;
    this.setupForm();
    this.getClientAgents(this.selectedClient.id);
    this.getClientSubscription(this.selectedClient.id);
  }

  async addClient() {
    const modal = await this.modalCtrl.create({
      component: AddClientPage,
      backdropDismiss: true,
      cssClass: 'add-client-modal',
      showBackdrop: true
    });

    await modal.present();
  }

  changeViewMode(view: string) {
    this.viewMode = view;
  }

  removeClient(agent: any) {
    const alertMessage = `Are you sure you want to remove ${agent.name} from ${this.selectedClient.name}`;
    this.removeAgent = agent;
    this.openConfirmationPopup('Remove Agent', alertMessage);
  }

  openConfirmationPopup(popupTitle, popupMessage) {
    this.utilityService.openAlert({
      title: popupTitle,
      message: popupMessage,
      type: 'success',
      showCancel: true
    });
  }

  async openAssignAgent() {
    const modal = await this.modalCtrl.create({
      component: AssignAgentComponent,
      backdropDismiss: true,
      cssClass: 'assign-agent-modal',
      showBackdrop: true,
      componentProps: {
        client: this.selectedClient
      }
    });

    await modal.present();
  }

  getPopupDetails() {
    this.popupService.popupUpdated.pipe(takeUntil(this.destroying$)).subscribe((details: Popup) => {
      if (details.confirm === true && details.title === 'Remove Agent') {
        this.agentLoading = true;
        this.agentService.removeClient(this.selectedClient.id, this.removeAgent.id).subscribe({
          next: (removeResponse) => {
            this.agentTableData = this.agentTableData.filter(
              (agent: ClientAgent) => agent.email !== removeResponse.agentEmail
            );
            this.agentLoading = false;
          },
          error: () => {
            this.agentLoading = false;
            this.utilityService.openAlert({
              title: 'Error',
              message: `Error Deleting Agent ${this.removeAgent.name}`,
              type: 'error'
            });
          },
          complete: () => {
            this.utilityService.openAlert({
              title: 'Success',
              message: `Agent ${this.removeAgent.name} Deleted Successfully`,
              type: 'success'
            });
          }
        });
      }
      if (details.confirm === true && details.title === 'Client Agents') {
        this.getClientAgents(this.selectedClient.id);
      }
      if (details.confirm === true && details.title === 'Load Activity') {
        this.getAllClients();
      }
    });
  }

  archive() {
    const userName = this.getFirstName();
    const message = `Are you sure you want to archive
    <b>${this.selectedClient.name} ?</b> <br>
    ${userName}’s subscription will not renew once it expires.`;

    this.utilityService
      .openConfirmation({
        message,
        title: 'Archive Client'
      })
      .then(async () => {
        await this.utilityService.showLoader('Archive Client');
        this.clientsService.archiveClient(this.selectedClient.id).subscribe({
          next: (data: any) => {
            if (data?.id) {
              // this.doRefresh.emit(true);
              this.getAllClients();
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
    <b>${this.selectedClient.name} ?</b> <br>
    ${userName}’s subscription will re-activate if expired.`;
    this.utilityService
      .openConfirmation({
        message,
        title: 'Restore Client'
      })
      .then(async () => {
        await this.utilityService.showLoader('Restore Client');
        this.clientsService.restoreClient(this.selectedClient.id).subscribe({
          next: (data: any) => {
            if (data?.id) {
              this.getAllClients();
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

  async updateClient(data) {
    await this.utilityService.showLoader('Saving');
    const client = {
      name: data?.name,
      ref: data?.ref,
      notes: data?.notes,
      id: this.selectedClient.id,
      phone: data?.phone
    };
    this.clientsService.updateClient(client).subscribe({
      next: (resp: any) => {
        if (resp?.id) {
          this.getAllClients();
          this.updateSelected(resp);
        }
        this.utilityService.hideLoader();
      },
      error: (e) => {
        console.log('update client error --- ', e);
        this.utilityService.hideLoader();
      }
    });
  }

  cancelRequest() {
    // const userName = this.getFirstName();
    const message = `Are you sure you want to cancel
    <b>${this.selectedClient.name} ?</b> <br>
    This will cancel their pending connection & subscription.`;
    this.utilityService
      .openConfirmation({
        message,
        title: 'Cancel Client'
      })
      .then(async () => {
        await this.utilityService.showLoader('Cancel Client');
        this.clientsService.cancelClientRequest(this.selectedClient.id).subscribe({
          next: (data: any) => {
            if (data?.id) {
              this.getAllClients();
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

  cancel() {
    this.setupForm();
  }

  onGridReady(params) {
    const api = params.api;
    api.sizeColumnsToFit();
  }

  getDate() {
    if (this.selectedClient?.created) {
      return new Date(this.selectedClient.created);
    }
  }

  changeArchiveClients(ev) {
    console.log('change archive === ', ev);

    this.isArchived = ev;
    this.getAllClients();
  }

  private setupForm() {
    if (this.selectedClient) {
      const datePipe = new DatePipe('en-US');
      const createdDate = this.getDate();
      this.clientForm.patchValue({
        ...this.selectedClient,
        created: this.selectedClient?.created
          ? datePipe.transform(createdDate.getTime(), 'dd/MM/yyyy')
          : ''
      });
    }
  }

  private getAllClients() {
    this.showLoading = true;
    if (this.isArchived) {
      this.clientsService.getArchiveClients().subscribe({
        next: (clients: ActiveClients) => {
          if (clients === undefined) {
            return;
          } else {
            this.clientList = clients.clients;
            this.selectClient();
            this.setupForm();
            this.getClientSubscription(this.selectedClient.id);
            this.getClientAgents(this.selectedClient.id);
          }
          this.showLoading = false;
        }
      });
    } else {
      this.clientsService.getActiveClients().subscribe({
        next: (clients: ActiveClients) => {
          if (clients === undefined) {
            return;
          } else {
            this.clientList = clients.clients;
            this.selectClient();
            this.setupForm();
            this.getClientSubscription(this.selectedClient.id);
            this.getClientAgents(this.selectedClient.id);
          }
          this.showLoading = false;
        }
      });
    }
  }

  private selectClient() {
    if (this.selectedClient?.id) {
      const selectedClient = this.clientList.find((c) => c.id === this.selectedClient.id);
      this.selectedClient = selectedClient ? selectedClient : this.clientList[0];
    } else {
      this.selectedClient = this.clientList[0];
    }
  }

  private getFirstName() {
    return this.selectedClient?.name?.split(' ')[0];
  }

  private updateSelected(client) {
    const index = this.clientList.findIndex((c) => c.id === client.id);
    if (index > -1) {
      this.clientList[index] = client;
    }
  }
}
