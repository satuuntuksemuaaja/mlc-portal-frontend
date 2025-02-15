import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'mlc-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent implements OnInit {
  @Input() title = '';
  @Input() text = '';
  @Input() type: 'error' | 'success' = 'success';
  @Input() showCancel = false;
  constructor(
    private modalCtrl: ModalController,
    private utilityService: UtilityService,
    private popupService: PopupService
  ) {}

  ngOnInit() {}

  close(popupTitle?: string, confirm?: string) {
    if (!confirm) {
      return this.modalCtrl.dismiss(popupTitle, confirm);
    } else {
      if (popupTitle) {
        this.popupService.setPopup({ title: popupTitle, confirm: true });
        this.modalCtrl.dismiss();
      }
    }
  }
}
