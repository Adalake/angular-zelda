import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationComponent } from "./components/administration/administration.component";
import { CreatePdfComponent } from "./components/create-pdf/create-pdf.component";
import { PrintComponent } from "./components/print/print.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { AdminRoutingModule } from "./admin-router.routing";
import { NzButtonModule } from "ng-zorro-antd/button";

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    FlexLayoutModule,
    RouterModule,
    AdminRoutingModule
  ],
  declarations: [AdministrationComponent, CreatePdfComponent, PrintComponent]
})
export class AdministrationModule {}
