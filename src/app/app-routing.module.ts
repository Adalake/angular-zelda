import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/components/home/home.component";
import { AdministrationComponent } from "./administration/components/administration/administration.component";
import { AdminGuard } from "./administration/administration.guard";
import { WorkbrenchComponent } from "./workbrench/components/workbrench/workbrench.component";
import { WorkbrenchRouteGard } from "./workbrench/workbrench.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "workbrench/:studyId",
    component: WorkbrenchComponent,
    canActivate: [WorkbrenchRouteGard]
  },
  {
    path: "administration",
    component: AdministrationComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard, WorkbrenchRouteGard]
})
export class AppRoutingModule {}
