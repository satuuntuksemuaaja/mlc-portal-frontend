/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AgentService } from 'src/app/services/agent.service';
import { ClientsService } from 'src/app/services/clients.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AgentRepository } from 'src/app/stores/agent.repository';

@Component({
  selector: 'mlc-assign-client',
  templateUrl: './assign-client.component.html',
  styleUrls: ['./assign-client.component.scss']
})
export class AssignClientComponent implements OnInit {
  @Input() agent;
  customActionSheetOptions = {
    header: 'Clients'
  };
  clients;
  clientId: string;
  loading = false;
  unassignedClients = [];
  assignClientForm = new FormGroup({
    client: new FormControl('', Validators.required)
  });
  constructor(
    private navigationService: NavigationService,
    private clientService: ClientsService,
    private agentRepo: AgentRepository,
    private route: ActivatedRoute,
    private agentService: AgentService,
    private utilityService: UtilityService,
    private popupService: PopupService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loading = true;
    this.clientService.getActiveClientsOnly().subscribe({
      next: (clients) => {
        this.clients = clients.clients;
      },
      complete: () => {
        this.getAssignedClient();
        this.loading = false;
      }
    });
  }

  getAssignedClient() {
    this.agentService.getClient(this.agent.id).subscribe({
      next: (assignedClients) => {
        this.getUnassignedClient(assignedClients.clients);
      }
    });
  }
  getUnassignedClient(assignedClients: any) {
    let flag = false;
    for (let i = 0; i < this.clients.length; i++) {
      flag = false;
      for (let j = 0; j < assignedClients.length; j++) {
        if (this.clients[i].id === assignedClients[j].id) {
          flag = true;
        }
      }
      if (!flag) {
        this.unassignedClients.push(this.clients[i]);
      }
    }
    this.clients = this.unassignedClients;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getSelectedClient(event) {
    this.clientId = event.detail.value;
  }

  assignClient() {
    this.loading = true;
    this.agentService.assignClient(this.clientId, this.agent.id).subscribe({
      next: () => {
        this.popupService.setPopup({ title: 'Get NonArchivedClients', confirm: true });
      },
      error: () => {
        this.utilityService.openAlert({
          title: 'Failed',
          message: `Failed to assigned client`,
          type: 'error'
        });
        this.loading = false;
      },
      complete: () => {
        this.modalCtrl.dismiss();
        this.utilityService.openAlert({
          title: 'Client Assigned',
          message: `Client Assigned to ${this.agent.name}. The agent and client have also been notified of the updated connection.`,
          type: 'success'
        });
        this.loading = false;
      }
    });
  }
}
