import {
  Component,
  OnInit,
  Input,
  Inject,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  FormDefinitionToken,
  FormBaseComponent
} from "src/app/form/form.base.component";
import { ScanScout, ScanHelical } from "src/app/model/scan";
import {
  ScanScoutFormType,
  ScanHelicalFormDefinition,
  ScanHelicalFormType
} from "src/app/form/form.definition";

@Component({
  selector: "app-scan-helical",
  templateUrl: "./scan-helical.component.html",
  styleUrls: ["./scan-helical.component.less"],
  providers: [
    {
      provide: FormDefinitionToken,
      useClass: ScanHelicalFormDefinition
    }
  ]
})
export class ScanHelicalComponent
  extends FormBaseComponent<ScanHelical, ScanHelicalFormType>
  implements OnInit, OnChanges {
  @Input() model: any;

  constructor(
    @Inject(FormDefinitionToken) public definition: ScanHelicalFormDefinition
  ) {
    super(definition);
  }
  basicFormConfig: any;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.model.currentValue, "model will to form");
    // if (!!changes.model) {
    //   this.test = this.createForm(
    //     this.model === undefined ? undefined : this.model2Form(this.model)
    //   );
    if (!!this.form) {
      this.basicFormConfig = this.form;
    }
    console.log(this.form, "this.form");
    // console.log(this.model2Form(changes.model.currentValue), "test model");
  }

  ngOnInit() {
    super.ngOnInit();
  }
  // createForm(value?: ScanScoutFormType) {
  //   const initial = {
  //     param_1: value ? value.param_1 : "param_1 test",
  //     param_2: value ? value.param_2 : "param_2 test",
  //     param_3: value ? value.param_3 : "param_3 test",
  //     width: value ? value.width : 99,
  //     size: value ? value.size : 22
  //   };
  //   return new FormGroup({
  //     param_1: new FormControl(initial.param_1, Validators.required),
  //     param_2: new FormControl(initial.param_2, Validators.required),
  //     param_3: new FormControl(initial.param_3, Validators.required),
  //     width: new FormControl(initial.width, Validators.required),
  //     size: new FormControl(initial.size, Validators.required)
  //   });
  // }
  // model2Form(model: ScanScout): ScanScoutFormType {
  //   return {
  //     param_1: model.param_1,
  //     param_2: model.param_2,
  //     param_3: model.param_3,
  //     width: 100,
  //     size: 2
  //   };
  // }
  // test = this.createForm(this.model);
}
