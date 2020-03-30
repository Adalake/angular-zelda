import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkbrenchComponent } from "./components/workbrench/workbrench.component";
import { ParameterComponent } from "./components/parameter/parameter.component";
import { DetailComponent } from "./components/detail/detail.component";
import { MenuModule } from "../menu/menu.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ScanHelicalComponent } from "./components/scan-helical/scan-helical.component";
import { ScanScoutComponent } from "./components/scan-scout/scan-scout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DetailComponent,
    ScanHelicalComponent,
    ScanScoutComponent,
    WorkbrenchComponent,
    ParameterComponent
  ]
})
export class WorkbrenchModule {}
