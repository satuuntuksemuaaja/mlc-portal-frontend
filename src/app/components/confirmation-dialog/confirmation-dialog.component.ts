import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'mlc-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title: string = null;
  @Input() message: string = null;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async close() {
    return this.modalCtrl.dismiss(null, 'close');
  }

  async confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}
