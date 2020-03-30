import { Component, OnInit } from "@angular/core";
import { printMessage } from "src/app/model/machine";
import { PrintActionService, PrintService } from "../../administration.service";
import { BaseAdmin } from "../../baseAdministration";
import { AdminGuard } from "../../administration.guard";

@Component({
  selector: "app-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.less"]
})
export class PrintComponent extends BaseAdmin implements OnInit {
  constructor(
    private printActionConstructor: PrintActionService,
    private printService: PrintService,
    private guard: AdminGuard
  ) {
    super(guard);
  }

  ngOnInit() {}

  start() {
    super.start();
    const action = {
      __typename: printMessage.PrintMessageTypes.PrintStart
    } as printMessage.PrintStart;
    this.printService.run(action);
  }

  stop() {
    super.stop();
    const action = {
      __typename: printMessage.PrintMessageTypes.PrintStop
    } as printMessage.PrintStop;
    this.printService.run(action);
  }
}
