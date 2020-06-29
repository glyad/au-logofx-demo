import { IEditableModel } from '@logofx/aurelia-mvvm-plugin';

export interface ICompany extends IEditableModel<string> {
  name: string;
}
