import { FormGroup } from "@angular/forms";
import {
  InjectionToken,
  OnInit,
  Input} from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface SelectOption<T> {
  value: T;
  shown: string;
}
export interface FormDefinition<ModelType, FormType> {
  createForm(form?: FormType): FormGroup;
  model2Form(model: ModelType): FormType;
}

export const FormDefinitionToken = new InjectionToken<FormDefinition<any, any>>(
  "form-definition-token"
);

export abstract class FormBaseComponent<ModelType, FormValueType>
  implements OnInit {
  private _model: ModelType | undefined;

  @Input()
  get model() {
    return this._model;
  }
  set model(value: ModelType | undefined) {
    this._model = value;
    if (this._model === undefined || this._model === null) {
      return;
    }
    if (this.form === undefined) {
      this.form = this.definition.createForm(
        this.definition.model2Form(this._model)
      );
    } else {
      const formValue = this.definition.model2Form(this._model);
      this.form.setValue(formValue);
    }
  }

  @Input() isCreateForm: boolean = false;
  @Input() get form() {
    return this.formSubject.value;
  }
  set form(value: FormGroup | undefined) {
    this.formSubject.next(value);
    console.log(value, "this form");
  }
  private readonly formSubject = new BehaviorSubject<FormGroup | undefined>(
    undefined
  );

  constructor(
    public readonly definition: FormDefinition<ModelType, FormValueType>
  ) {}
  ngOnInit() {
    if (this.isCreateForm) {
      this.form = this.definition.createForm(
        this.model === undefined
          ? undefined
          : this.definition.model2Form(this.model)
      );
    }
  }
}
