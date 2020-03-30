import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TitlebarComponent } from "./components/titlebar/titlebar.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";

@NgModule({
  imports: [CommonModule, NzButtonModule, FlexLayoutModule, RouterModule],
  declarations: [TitlebarComponent],
  exports: [TitlebarComponent]
})
export class TitlebarModule {}
