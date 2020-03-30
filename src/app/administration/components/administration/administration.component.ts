import { Component, OnInit, OnDestroy } from "@angular/core";
import { AdminGuard } from "../../administration.guard";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.less"]
})
export class AdministrationComponent implements OnInit, OnDestroy {
  constructor(private adminGuard: AdminGuard) {}
  ngOnDestroy(): void {
    this.adminGuard.isOccupied = false;
  }

  // test() {
  // console.log(this.printActionConstructor)
  // this.http.post("http://localhost:3000/warming", { test: "testgo" });
  // }
  ngOnInit() {}
}
