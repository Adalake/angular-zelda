import { FormDefinition, SelectOption } from "./form.base.component";
import { ScanScout, ScanHelical } from "../model/scan";
import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface StudyFormType {
  name: string;
  param_1: string;
  param_2: string;
  param_3: string;
}

export interface ScanTypeBase {
  readonly width: number;
  readonly size: number;
}
export interface ScanScoutFormType extends ScanTypeBase {
  readonly param_1: string;
  readonly param_2: string;
  readonly param_3: string;
}

export interface ScanHelicalFormType extends ScanTypeBase {
  readonly param_1: string;
  readonly param_2: string;
  readonly param_3: string;
}

export class ScanScoutFormDefinition
  implements FormDefinition<ScanScout, ScanScoutFormType> {
  createForm(value?: ScanScoutFormType) {
    const initial = {
      param_1: value ? value.param_1 : "param_1 test",
      param_2: value ? value.param_2 : "param_2 test",
      param_3: value ? value.param_3 : "param_3 test",
      width: value ? value.width : 99,
      size: value ? value.size : 22
    };
    return new FormGroup({
      param_1: new FormControl(initial.param_1, Validators.required),
      param_2: new FormControl(initial.param_2, Validators.required),
      param_3: new FormControl(initial.param_3, Validators.required),
      width: new FormControl(initial.width, Validators.required),
      size: new FormControl(initial.size, Validators.required)
    });
  }

  model2Form(model: ScanScout): ScanScoutFormType {
    return {
      param_1: model.param_1,
      param_2: model.param_2,
      param_3: model.param_3,
      width: 100,
      size: 2
    };
  }
}

export class ScanHelicalFormDefinition
  implements FormDefinition<ScanHelical, ScanHelicalFormType> {
  createForm(value?: ScanHelicalFormType): FormGroup {
    const initial = {
      param_1: value ? value.param_1 : "param_1 test",
      param_2: value ? value.param_2 : "param_2 test",
      param_3: value ? value.param_3 : "param_3 test",
      width: value ? value.width : 99,
      size: value ? value.size : 22
    };
    return new FormGroup({
      param_1: new FormControl(initial.param_1, Validators.required),
      param_2: new FormControl(initial.param_2, Validators.required),
      param_3: new FormControl(initial.param_3, Validators.required),
      width: new FormControl(initial.width, Validators.required),
      size: new FormControl(initial.size, Validators.required)
    });
  }
  model2Form(model: ScanHelical): ScanHelicalFormType {
    return {
      param_1: model.param_1,
      param_2: model.param_2,
      param_3: model.param_3,
      width: 321,
      size: 212
    };
  }
}
