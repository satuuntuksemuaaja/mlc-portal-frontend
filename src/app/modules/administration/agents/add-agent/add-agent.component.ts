/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgentService } from 'src/app/services/agent.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Organisation, OrgRepository, Role } from 'src/app/stores/org.repository';
import { AgentRepository } from 'src/app/stores/agent.repository';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'mlc-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  customActionSheetOptions = {
    header: 'Roles'
  };
  roles: Role[];
  org: Organisation;

  myform = new FormGroup({
    name: new FormControl(),
    emailPrefix: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')
    ]),
    roleId: new FormControl('', [Validators.required])
  });
  showModal: boolean;
  text: string;
  title: string;
  constructor(
    private navigationService: NavigationService,
    private orgRepo: OrgRepository,
    private agentService: AgentService,
    private utilityService: UtilityService,
    private agentRepo: AgentRepository,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.orgRepo.org$.subscribe({
      next: (org) => {
        this.roles = org.security.roles;
        this.org = org;
      }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submit() {
    const email = this.myform.value.emailPrefix + this.org.org.primaryDomain;
    this.agentService.addAgent(this.myform.value).subscribe({
      next: () => {
        this.openSuccessPopup(
          'New Agent Created',
          `An agent account has been created for ${email}. 
          They have been sent an invite to complete account registration.`
        );
        this.agentService.getAllAgents().subscribe({
          next: (agents) => {
            this.agentRepo.setAgentInfo(agents);
          }
        });
      },
      error: () => {
        this.openErrorPopup('ERROR', 'Try Again');
      }
    });
  }

  async openSuccessPopup(title: string, message: string) {
    await this.utilityService.openAlert({
      title: `${title}`,
      message: `${message}`,
      type: 'success'
    });
    this.modalCtrl.dismiss();
  }

  openErrorPopup(title: string, message: string) {
    return this.utilityService.openAlert({
      title: `${title}`,
      message: `${message}`,
      type: 'error'
    });
  }
}
