import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";

import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PageComponent } from "./components/page/page.component";
import { HomeRoutingModule } from "./home-router.routing";
import { CardListComponent } from './components/card-list/card-list.component';
import { CardModule } from '../card/card/card.module';
import { MenuModule } from '../menu/menu.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HomeRoutingModule,
    FlexLayoutModule,
    CardModule,
    MenuModule,
    NzCheckboxModule,
    NzButtonModule
  ],
  declarations: [HomeComponent, CardListComponent,DashboardComponent, PageComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
