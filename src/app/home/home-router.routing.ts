import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PageComponent } from "./components/page/page.component";

const homeRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "previous/:patientId/:studyId", component: PageComponent }
      // { path: "posterior/:patientId/:studyId", component: PageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
