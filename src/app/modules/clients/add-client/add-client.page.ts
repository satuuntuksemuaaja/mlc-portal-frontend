import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ActivityService } from 'src/app/services/activity.service';
import { ClientsService } from 'src/app/services/clients.service';
import { PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Activity, ActivityRepository } from 'src/app/stores/activity.repository';
import { OrgRepository } from 'src/app/stores/org.repository';
import { ValidationHelper } from 'src/app/utils/validation-helper';

@Component({
  selector: 'mlc-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss']
})
export class AddClientPage implements OnInit {
  addClientForm: FormGroup;
  public showLoader = false;
  activities: Activity[];
  activityLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public validationHelper: ValidationHelper,
    private utilityService: UtilityService,
    private modalCtrl: ModalController,
    private orgRepo: OrgRepository,
    private clientService: ClientsService,
    private activityRepo: ActivityRepository,
    private activityService: ActivityService,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addClientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', ValidationHelper.phoneValidationRules],
      clientReference: ['', []]
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  addClient() {
    if (this.addClientForm?.valid) {
      const formData = this.addClientForm.value;
      const client = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        ref: formData.clientReference
      };
      this.showLoader = true;
      this.clientService.addClient(client).subscribe({
        next: async (data) => {
          console.log(data);
          this.showLoader = false;
          this.loadActivities();
          this.popupService.setPopup({ confirm: true, title: 'Load Activity' });
          await this.modalCtrl.dismiss();
        },
        error: async (e) => {
          console.log('add client error', e.error.message);
          let errorMessage = e.error.message || 'Unable to add client!';
          if (e.status === 500) {
            errorMessage =
              'An error occured whilst processing your request, please try again or contact your administrator.';
          }
          // await this.modalCtrl.dismiss();
          this.utilityService.openAlert({
            message: errorMessage,
            title: 'New Client  ',
            type: 'error'
          });
          this.showLoader = false;
        },
        complete: () => {
          this.utilityService.openAlert({
            title: 'New Client Created',
            message:
              'You will be notified when your client has set up their account and private sharing may commence.',
            type: 'success'
          });
        }
      });
    }
  }

  loadActivities() {
    this.activityService.getActivities().subscribe({
      next: () => {
        this.activityRepo.setLoading(false);
      },
      error: () => {
        this.activityRepo.setLoading(false);
      }
    });
    this.activityRepo.activity$.subscribe({
      next: (activities: Activity[]) => {
        this.activities = activities;
      }
    });
    this.activityRepo.loading$.subscribe({
      next: (loadingStatus) => {
        this.activityLoading = loadingStatus;
      }
    });
  }
}
