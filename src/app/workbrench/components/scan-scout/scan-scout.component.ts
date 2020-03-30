import {
  Component,
  OnInit,
  Input,
  Inject,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { ScanHelical, ScanScout } from "src/app/model/scan";
import {
  FormBaseComponent,
  FormDefinitionToken
} from "src/app/form/form.base.component";
import {
  ScanScoutFormDefinition,
  ScanScoutFormType
} from "src/app/form/form.definition";

@Component({
  selector: "app-scan-scout",
  templateUrl: "./scan-scout.component.html",
  styleUrls: ["./scan-scout.component.less"],
  providers: [
    { provide: FormDefinitionToken, useClass: ScanScoutFormDefinition }
  ]
})
export class ScanScoutComponent
  extends FormBaseComponent<ScanScout, ScanScoutFormType>
  implements OnInit, OnChanges {
  @Input() model: any;
  constructor(
    @Inject(FormDefinitionToken) public definition: ScanScoutFormDefinition
  ) {
    super(definition);
  }
  basicFormConfig: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      this.basicFormConfig = this.form;
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
