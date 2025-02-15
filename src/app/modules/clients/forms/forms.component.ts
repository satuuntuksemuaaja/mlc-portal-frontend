import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';
import { FilesFormDataType } from './FilesFormDataType';

@Component({
  selector: 'mlc-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnChanges {
  @Input() fields: FilesFormDataType[] = [];
  @Input() title: string;
  formControls: { [key: string]: any } = {};
  orderedInputs: FilesFormDataType[] | any;
  myForm: any;
  customActionSheetOptions = {
    header: 'Reports',
    subHeader: 'Select the report to run.'
  };
  showLoader = false;
  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup(this.formControls);
    this.setForm();
  }

  ngOnChanges() {}

  setForm() {
    this.showLoader = true;
    this.orderedInputs = this.fields = this.fields.sort((a: any, b: any) => a.order - b.order);

    this.orderedInputs.map((data: FilesFormDataType) => {
      const fieldname: string = data.fieldname;
      // this.formControls[fieldname] = new FormControl({ value: ' ', disabled: false });
      this.formControls[fieldname] = new FormControl(data.value);
    });
    this.myForm = new FormGroup(this.formControls);
    this.showLoader = false;
  }

  submit() {
    // this.messageEvent.emit(this.myForm.value);
  }

  close() {
    this.popupService.setPopup({ confirm: true, title: 'Dismiss loadForm Modal' });
    // this.cancelEvent.emit();
  }
}
