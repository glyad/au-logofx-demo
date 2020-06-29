import { IEditableModel } from '@logofx/aurelia-mvvm-plugin';

export interface IContact extends IEditableModel<string> {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}
