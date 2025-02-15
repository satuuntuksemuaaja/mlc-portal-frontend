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
import { ClientsRepository } from 'src/app/stores/clients.repository';

@Component({
  selector: 'mlc-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.scss']
})
export class AssignAgentComponent implements OnInit {
  @Input() client;
  customActionSheetOptions = {
    header: 'Agents'
  };
  clients;
  agentId: string;
  loading = false;
  assignAgentForm = new FormGroup({
    agent: new FormControl('', Validators.required)
  });
  agents: any;
  unassignedAgents = [];
  constructor(
    private navigationService: NavigationService,
    private agentService: AgentService,
    private clientService: ClientsService,
    private utilityService: UtilityService,
    private popupService: PopupService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loading = true;
    this.agentService.getActiveAgents().subscribe({
      next: (agents) => {
        this.agents = agents.agents;
      },
      complete: () => {
        this.getAssignedAgent();
        this.loading = false;
      }
    });
  }

  getAssignedAgent() {
    this.clientService.getAgents(this.client.id).subscribe({
      next: (assignedAgents) => {
        this.getUnassignedAgents(assignedAgents.agents);
      }
    });
  }

  getUnassignedAgents(assignedAgents: any) {
    let flag = false;
    for (let i = 0; i < this.agents.length; i++) {
      flag = false;
      for (let j = 0; j < assignedAgents.length; j++) {
        if (this.agents[i].id === assignedAgents[j].id) {
          flag = true;
        }
      }
      if (!flag) {
        this.unassignedAgents.push(this.agents[i]);
      }
    }
    this.agents = this.unassignedAgents;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getSelectedAgent(event) {
    this.agentId = event.detail.value;
  }

  assignAgent() {
    this.loading = true;
    this.agentService.assignClient(this.client.id, this.agentId).subscribe({
      next: () => {
        this.popupService.setPopup({ confirm: true, title: 'Client Agents' });
        // this.navigationService.back();
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
          title: 'Agent Assigned',
          message: `Agent Assigned to Client ${this.client.name}`,
          type: 'success'
        });
        this.loading = false;
      }
    });
  }
}
