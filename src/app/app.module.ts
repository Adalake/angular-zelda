import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FlexLayoutModule } from "@angular/flex-layout";

import { StatebarModule } from "./statebar/statebar.module";
import { TitlebarModule } from "./titlebar/titlebar.module";

import { registerLocaleData, CommonModule } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { HttpClientModule } from "@angular/common/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { GRAPHQL_HTTP_ENDPOINT } from "./share/config";
import { HomeModule } from "./home/home.module";
import { HomeRoutingModule } from "./home/home-router.routing";
import { AdministrationModule } from "./administration/administration.module";
import { AdminRoutingModule } from "./administration/admin-router.routing";
import { CardModule } from "./card/card/card.module";
import { WorkbrenchModule } from "./workbrench/workbrench.module";
import { MenuModule } from "./menu/menu.module";

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    StatebarModule,
    TitlebarModule,
    FlexLayoutModule,
    HttpClientModule,
    HomeModule,
    CardModule,
    MenuModule,
    WorkbrenchModule,
    ApolloModule,
    HttpLinkModule,
    AdministrationModule,
    AdminRoutingModule,
    HomeRoutingModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: GRAPHQL_HTTP_ENDPOINT
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
