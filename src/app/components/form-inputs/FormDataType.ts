export interface FormDataType {
  name: string;
  fieldName: string;
  type: InputType;
  order: number;
  disable?: boolean | false;
  readOnly?: boolean | false;
  dropDownLabel?: string;
  dropDownData?: string[];
  name2?: string;
  fieldName2?: string;
  dropDownSelected?: string | 'Select One';
  value?: any | string;
}

export enum InputType {
  'text',
  'longtext',
  'date',
  'fromToDate',
  'dropDown',
  'phone'
}
