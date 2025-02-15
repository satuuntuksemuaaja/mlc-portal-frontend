import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormDataType } from './FormDataType';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mlc-form-inputs',
  templateUrl: './form-inputs.component.html',
  styleUrls: ['./form-inputs.component.scss']
})
export class FormInputsComponent implements OnInit, OnChanges {
  @Input() inputs: FormDataType[] = [];
  @Input() width: number;
  @Input() showArchive = false;
  @Output() messageEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() archiveEvent = new EventEmitter();
  @Output() dropDownCurrentValue = new EventEmitter();

  formControls: { [key: string]: any } = {};
  orderedInputs: FormDataType[] | any;
  myForm: any;
  customActionSheetOptions = {
    header: 'Reports',
    subHeader: 'Select the report to run.'
  };
  pattern = '[0-9 ]{10}';
  constructor() {}

  ngOnInit(): void {
    this.myForm = new FormGroup(this.formControls);
  }

  ngOnChanges() {
    this.setForm();
  }

  setForm() {
    this.orderedInputs = this.inputs = this.inputs.sort((a: any, b: any) => a.order - b.order);

    this.orderedInputs.map((data: FormDataType) => {
      const fieldName: string = data.fieldName;
      if (data.readOnly === true || data.disable === true) {
        if (data.type !== 3) {
          this.formControls[fieldName] = new FormControl({ value: data.value, disabled: true });
        } else {
          this.formControls[data.fieldName] = new FormControl({
            value: data.value,
            disabled: true
          });
          this.formControls[data.fieldName2] = new FormControl({
            value: data.value,
            disabled: true
          });
        }
        if (data.type === 5) {
          this.formControls[fieldName] = new FormControl({ value: data.value, disabled: true }, [
            Validators.pattern(this.pattern)
          ]);
        }
      } else {
        if (data.type === 3) {
          this.formControls[data.fieldName] = new FormControl({ value: data.value });
          this.formControls[data.fieldName2] = new FormControl({ value: data.value });
        } else {
          this.formControls[fieldName] = new FormControl({ value: data.value, disabled: false });
        }
        if (data.type === 5) {
          this.formControls[data.fieldName] = new FormControl({ value: data.value }, [
            Validators.pattern(this.pattern)
          ]);
        }
      }
    });
    this.myForm = new FormGroup(this.formControls);
  }

  submit() {
    this.messageEvent.emit(this.myForm.value);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  archive() {
    this.archiveEvent.emit(this.myForm.value);
  }

  getCurrentValue(event: any) {
    if (event.detail.value !== '') {
      this.dropDownCurrentValue.emit(this.myForm.value);
    }
  }
}
