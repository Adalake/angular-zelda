import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatebarComponent } from "./components/statebar/statebar.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [StatebarComponent],
  exports: [StatebarComponent]
})
export class StatebarModule {}
