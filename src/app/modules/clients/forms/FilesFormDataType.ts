export interface FilesFormDataType {
  name: string;
  fieldname: string;
  type: string;
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
  'longtext'
}
