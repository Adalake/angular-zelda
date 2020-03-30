import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdministrationComponent } from "./components/administration/administration.component";
import { CreatePdfComponent } from "./components/create-pdf/create-pdf.component";
import { PrintComponent } from "./components/print/print.component";
import { AdminGuard } from "./administration.guard";

const adminRoutes: Routes = [
  {
    path: "administration",
    // pathMatch: "full", 加上会导航不到子路由
    component: AdministrationComponent,
    children: [
      { path: "pdf", component: CreatePdfComponent, canActivate: [AdminGuard] },
      { path: "print", component: PrintComponent, canActivate: [AdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
