/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Audit, Audits } from 'src/app/interfaces/agents.interface';
import { Client } from 'src/app/interfaces/clients.interface';
import { AgentService } from 'src/app/services/agent.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PopupService, Popup } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Agent, AgentRepository, Agents } from 'src/app/stores/agent.repository';
import { OrgRepository } from 'src/app/stores/org.repository';
import { ValidationHelper } from 'src/app/utils/validation-helper';
import { takeUntil, Subject } from 'rxjs';
import { UserDetails, UserRepository } from 'src/app/stores/user.repository';
import { AssignClientComponent } from './assign-client/assign-client.component';
import { ModalController } from '@ionic/angular';
import { AddAgentComponent } from './add-agent/add-agent.component';

@Component({
  selector: 'mlc-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit, OnChanges, OnDestroy {
  @Output() changeMode = new EventEmitter();
  @Output() setAgent = new EventEmitter();
  @Output() setToggleState = new EventEmitter();
  @Input() croppedImg = '';
  @Input() agent;
  @Input() isUpdateImage;
  @Input() cancelEdit;
  @Input() toggleState;
  agents: Agent[];
  viewMode = 'settings';
  archive = true;
  agentList: Agents;
  selectedAgent: Agent;
  public columnDefs: ColDef[] = [
    { field: 'name', headerName: 'NAME', width: 150 },
    {
      field: 'email',
      headerName: 'EMAIL',
      cellStyle: { color: '#66788A', fontWeight: 'bold' },
      width: 240
    },
    { field: 'created', headerName: 'ASSIGNED', width: 120 },
    {
      field: 'remove',
      headerName: ' ',
      onCellClicked: (e) => {
        this.removeClientPopup(e.data);
      },
      width: 90,
      cellStyle: { cursor: 'pointer' }
    }
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true,
    autoHeight: true
  };
  rowData = [];
  roles = [];
  auditColumnDefs = [
    { field: 'action', headerName: 'AUDIT TYPE' },
    { field: 'details', headerName: 'DETAILS' },
    { field: 'time', headerName: 'TIME' }
  ];

  auditData: Audit[] = [];
  profileImage: any;
  agentProfileImg = 'assets/images/person-circle-outline.png';
  agentProfileImageSubscription: Subscription;
  agentRole: any;
  isLoading = false;
  isArchived = false;
  public agentForm: FormGroup;
  clientTableLoading = false;
  agentRemoveClient: Client;
  userDetails: UserDetails;

  private readonly destroying$ = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private agentService: AgentService,
    private agentRepo: AgentRepository,
    private orgRepo: OrgRepository,
    private utilityService: UtilityService,
    private popupService: PopupService,
    private formBuilder: FormBuilder,
    private userRepo: UserRepository,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getAllAgents();
    this.getPopupDetails();
    this.getNonArchivedClients();
    this.getCurrentUser();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.cancelEdit === true) {
      this.isArchived = changes.toggleState.currentValue;
      this.selectedAgent = undefined;
      this.getAgent();
      this.selectedAgent = this.agent;
    } else {
      if (changes.croppedImg && this.isUpdateImage) {
        this.selectedAgent = this.agent;
        this.getEditedImage(changes.croppedImg.currentValue);
        this.isArchived = changes.toggleState.currentValue;
        // this.getAgent();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
  }

  getCurrentUser() {
    this.userRepo.userDetails$.pipe(takeUntil(this.destroying$)).subscribe({
      next: (data) => {
        this.userDetails = data;
      }
    });
  }

  async openAssignClient() {
    const modal = await this.modalCtrl.create({
      component: AssignClientComponent,
      backdropDismiss: true,
      cssClass: 'assign-agent-modal',
      showBackdrop: true,
      componentProps: {
        agent: this.selectedAgent
      }
    });

    await modal.present();
  }

  getAllAgents() {
    if (this.isArchived) {
      this.agentService.getArchiveAgents().subscribe({
        next: (agents: Agents) => {
          if (agents === undefined) {
            return;
          }
          this.agentRepo.setAgentInfo(agents);
        },
        complete: () => {
          this.getAgent();
        }
      });
    } else {
      this.agentService.getActiveAgents().subscribe({
        next: (agents: Agents) => {
          if (agents === undefined) {
            return;
          }
          this.agentRepo.setAgentInfo(agents);
        },
        complete: () => {
          this.getAgent();
        }
      });
    }
  }

  getNonArchivedClients() {
    this.clientTableLoading = true;
    if (this.selectedAgent) {
      this.agentService.getClient(this.selectedAgent.id).subscribe({
        next: (clientData) => {
          if (clientData === undefined) {
            return;
          } else {
            clientData.clients.map((client) => {
              client.remove = 'remove';
            });
            clientData.clients?.forEach((element) => {
              const datePipe = new DatePipe('en');
              element.created = datePipe.transform(element?.created, 'MMM d, y h:mm');
            });
            this.rowData = clientData.clients;
          }
          this.clientTableLoading = false;
        },
        error: () => {
          this.clientTableLoading = false;
        }
      });
    }
  }

  openSuccessMessage(title: string, message: string, cancel?: boolean) {
    this.utilityService.openAlert({
      title: `${title}`,
      message: `${message}`,
      type: 'success',
      showCancel: cancel
    });
    this.isLoading = false;
  }

  openErrorMessage(title: string, message: string) {
    this.utilityService.openAlert({
      title: `${title}`,
      message: `${message}`,
      type: 'error'
    });
    this.isLoading = false;
  }

  getOrgRole() {
    this.orgRepo.org$.subscribe({
      next: (org) => {
        org.security.roles.map((role) => {
          this.roles.push(role);
        });
      }
    });
  }

  setRole() {
    if (this.roles.length === 0) {
      this.getOrgRole();
    }
    this.agentRole = this.roles[parseInt(this.selectedAgent.roleId, 10) - 1];
  }

  getRoleIdFromRole() {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i] === this.agentRole) {
        return (i + 1).toString();
      }
    }
  }

  getAgentById(id: string): Agent {
    for (let i = 0; i < this.agents.length; i++) {
      if (this.agents[i].id === id) {
        return this.agents[i];
      }
    }
    return null;
  }

  openAgent(_event: Agent) {
    this.selectedAgent = this.getAgentById(_event.id);
    this.agentProfileImg = 'assets/images/person-circle-outline.png';
    this.setAgent.emit(this.selectedAgent);
    this.setForm(true);
    this.agentProfileImageSubscription?.unsubscribe();
    this.getAgentImage();
    this.getNonArchivedClients();
    this.getAuditHistory();
  }

  async addClient() {
    const modal = await this.modalCtrl.create({
      component: AddAgentComponent,
      backdropDismiss: true,
      cssClass: 'add-agent-modal',
      showBackdrop: true
    });

    await modal.present();
  }

  setForm(setRole: boolean) {
    this.setupAgentForm(setRole);
  }

  getAgent() {
    this.agentRepo.agents$.subscribe({
      next: (agents) => {
        this.agentList = agents;
        this.agents = this.agentList.agents;
        if (!this.selectedAgent) {
          if (!this.cancelEdit) {
            this.selectedAgent = this.agents[0];
          } else {
            this.agents.forEach((agent) => {
              if (agent.id === this.agent.id) {
                this.selectedAgent = agent;
              }
            });
          }
          this.setAgent.emit(this.selectedAgent);
          if (!this.cancelEdit) {
            this.getNonArchivedClients();
          }
          this.getAuditHistory();
          this.setForm(true);
          this.getAgentImage();
        }
        this.openAgent(this.selectedAgent);
      }
    });
  }

  async updateAgent(data: Agent) {
    this.selectedAgent.name = data.name;
    this.selectedAgent.phone = data.phone;
    this.selectedAgent.roleId = data.roleId;
    await this.utilityService.showLoader('Saving');
    this.agentService.updateAgent(this.selectedAgent).subscribe({
      next: () => {
        this.utilityService.hideLoader();
        this.getAgent();
      },
      error: (e) => {
        console.log('error --- ', e);
        this.utilityService.hideLoader();
      }
    });
  }

  cancelUpdate() {
    // this.selectedAgent = {
    //   id: '',
    //   created: '',
    //   email: '',
    //   name: '',
    //   roleId: '',
    //   status: '',
    //   phone: ''
    // };
    this.setForm(true);
  }

  getPopupDetails() {
    this.popupService.popupUpdated.pipe(takeUntil(this.destroying$)).subscribe((details: Popup) => {
      if (details.title) {
        const a = details.title.split(' ');
        this[`${a[0].toLowerCase()}${a[1]}`]();
      }
    });
  }

  async restoreAgent() {
    await this.utilityService.showLoader('Restore Agent');
    this.agentService.restoreAgent(this.selectedAgent.id).subscribe({
      next: (restoredAgent) => {
        for (let i = 0; i < this.agents.length; i++) {
          if (this.agents[i].id === restoredAgent.agent.id) {
            this.agents[i].status = 'active';
            break;
          }
        }
        this.agentList.agents = this.agents;
        this.agentRepo.setAgentInfo(this.agentList);
      },
      error: () => {
        this.utilityService.hideLoader();
        this.openErrorMessage('Error', 'Failed to restore agent.');
      },
      complete: () => {
        this.utilityService.hideLoader();
        this.openSuccessMessage('Success', 'Agent restored successfully.');
      }
    });
  }

  async archiveAgent() {
    await this.utilityService.showLoader('Archive Agent');
    this.agentService.archiveAgent(this.selectedAgent.id).subscribe({
      next: (archiveAgent) => {
        if (archiveAgent === undefined) {
          return;
        } else {
          this.agents.map((agent) => {
            if (agent.id === archiveAgent.agent.id) {
              agent.status = 'archived';
            }
          });
          this.selectedAgent.status = 'archived';
        }
      },
      error: () => {
        this.utilityService.hideLoader();
        this.openErrorMessage('ARCHIVE FAILED', 'Agent Archived Failed');
      },
      complete: () => {
        this.utilityService.hideLoader();
        this.getAllAgents();
        this.openSuccessMessage('ARCHIVE SUCCESS', 'Agent Archived Successfully');
      }
    });
    this.getAgent();
  }

  archiveAgentClick() {
    const message = `Are you sure you want to archive ${this.selectedAgent.name}?\n ${this.selectedAgent.name} will no longer be able to login or communicate with clients.`;
    this.openSuccessMessage('Archive Agent', message, true);
  }

  restoreAgentClick() {
    const message = `Are you sure you want to restore ${this.selectedAgent.name}?\n ${this.selectedAgent.name} will able to login & communicate with clients.`;
    this.openSuccessMessage('Restore Agent', message, true);
  }

  changeViewMode(view: string) {
    this.viewMode = view;
  }

  getImage(event: any) {
    this.profileImage = event.target.files[0];
  }

  getEditedImage(data: string) {
    this.updateAgentImg(data);
  }

  getAgentImage() {
    this.agentProfileImg = 'assets/images/person-circle-outline.png';
    if (this.selectedAgent) {
      this.agentProfileImageSubscription = this.agentService
        .getAgentImageById(this.selectedAgent.id)
        .pipe(takeUntil(this.destroying$))
        .subscribe({
          next: (agentImage) => {
            this.agentProfileImg = !agentImage.photo
              ? 'assets/images/person-circle-outline.png'
              : agentImage.photo;
          }
        });
    }
  }

  updateAgentImg(updatedImage) {
    if (this.selectedAgent.id) {
      this.isLoading = true;
      this.agentService
        .updateAgentImg({ id: this.selectedAgent.id, thumb: updatedImage })
        .subscribe({
          next: (isUpdated) => {
            if (isUpdated === undefined) {
              return;
            } else {
              this.agentProfileImg = isUpdated.photo;
            }
          },
          error: () => {
            this.openErrorMessage('Update Error', `Error uploading image`);
          },
          complete: () => {
            this.setForm(false);
            this.openSuccessMessage(
              'Image Updated',
              `Profile Image Updated for ${this.selectedAgent.name}`
            );
            // this.getAllAgents();
          }
        });
    }
  }

  removeClient() {
    if (this.agentRemoveClient) {
      this.clientTableLoading = true;
      this.agentService
        .removeClient(this.agentRemoveClient.id, this.selectedAgent.id)
        .pipe(takeUntil(this.destroying$))
        .subscribe({
          next: (deletedClient) => {
            this.rowData = this.rowData.filter((client) => client.id !== this.agentRemoveClient.id);
            this.openSuccessMessage(
              'Success',
              `Client ${deletedClient.clientName} Deleted Successfully`
            );
            this.clientTableLoading = false;
          },
          error: () => {
            this.openErrorMessage('Error', `Error Deleting Client ${this.agentRemoveClient.name}`);
            this.clientTableLoading = false;
          }
        });
    }
  }

  removeClientPopup(client: any) {
    this.openSuccessMessage(
      'Remove Client',
      `Are you sure you want to remove ${client.name} from ${this.selectedAgent.name}`,
      true
    );
    this.agentRemoveClient = client;
  }

  getCurrentRole(role) {
    role = role?.detail?.value;
    this.selectedAgent.name = this.agentForm?.getRawValue()?.name;
    this.agentRole = role;
  }

  changeAdministrationMode(mode: string) {
    this.changeMode.emit(mode);
    this.setToggleState.emit(this.isArchived);
    this.setAgent.emit(this.selectedAgent);
  }

  onGridReady(params) {
    const api = params.api;
    api.sizeColumnsToFit();
  }

  changeArchiveAgents(ev) {
    this.isArchived = ev;
    this.getAllAgents();
  }

  private getAuditHistory() {
    this.agentService
      .getAuditHistoryByAgentId(this.selectedAgent?.id)
      .pipe(takeUntil(this.destroying$))
      .subscribe({
        next: (auditReport: Audits) => {
          if (auditReport === undefined) {
            return;
          } else {
            auditReport.agents?.forEach((element) => {
              const datePipe = new DatePipe('en');
              element.time = datePipe.transform(element?.time, 'dd-MMM-yy h:mma');
            });
            this.auditData = auditReport.agents;
          }
        }
      });
  }

  private setupAgentForm(setRole: boolean) {
    if (setRole === true) {
      this.setRole();
    }
    this.agentForm = this.formBuilder.group({
      name: [this.selectedAgent?.name, [Validators.required]],
      email: [{ value: this.selectedAgent?.email, disabled: true }, [Validators.required]],
      phone: [this.selectedAgent?.phone, [...ValidationHelper.phoneValidationRules]],
      roleId: [this?.selectedAgent?.roleId, [Validators.required]]
    });
  }
}
