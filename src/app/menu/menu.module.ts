import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./components/menu/menu.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzButtonModule } from "ng-zorro-antd/button";

@NgModule({
  imports: [CommonModule, NzButtonModule, FlexLayoutModule],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {}
