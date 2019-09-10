import { Container, bindable } from 'aurelia-framework';
import { ValidationController, validateTrigger } from 'aurelia-validation';
import { IModel } from '../model';

export interface IObjectWrapper<T extends IModel<any>> {

    model: T;
}

export interface IObjectViewModel<T extends IModel<any>> extends IObjectWrapper<T> {

  isSelected: boolean;

  isEnabled: boolean;

}

/**
 * ObjectViewModel
 */
export abstract class ObjectViewModel<T extends IModel<any>> implements IObjectViewModel<T> {

  @bindable()
  public model: T;
  public validationController: ValidationController;

  private _isSelected: boolean = false;
  private _isEnabled: boolean = true;

  public get isSelected(): boolean {
      return this._isSelected;
  }

  public set isSelected(value: boolean) {
      if (this._isSelected === value)
          return;

      this._isSelected = value;
  }

  public get isEnabled(): boolean {
      return this._isEnabled;
  }

  public set isEnabled(value: boolean) {
      if (this._isEnabled === value) {
          return;
      }
      this._isEnabled = value;
  }

  constructor(model: T) {
    this.model = model;

    this.validationController = Container.instance.get(ValidationController);
    this.validationController.changeTrigger(validateTrigger.changeOrBlur);
  }

}
