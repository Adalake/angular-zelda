import { Component, OnInit } from "@angular/core";
import { pdfMessage } from "src/app/model/machine";
import { PdfService, PdfServiceAction } from "../../administration.service";
import { AdminGuard } from "../../administration.guard";
import { BaseAdmin } from "../../baseAdministration";

@Component({
  selector: "app-create-pdf",
  templateUrl: "./create-pdf.component.html",
  styleUrls: ["./create-pdf.component.less"]
})
export class CreatePdfComponent extends BaseAdmin implements OnInit {
  constructor(
    private pdfService: PdfService,
    pdfActionConstructor: PdfServiceAction,
    private guard: AdminGuard
  ) {
    super(guard);
  }
  value: number = 80;
  resultValue: number = 0;
  start() {
    super.start();
    const action = {
      __typename: pdfMessage.PdfMessageType.PdfStart,
      tube_voltage: [this.value]
    } as pdfMessage.PdfStart;
    this.pdfService.run(action);
  }
  stop() {
    super.stop();
    const action = {
      __typename: pdfMessage.PdfMessageType.PdfStop,
      result: this.resultValue
    } as pdfMessage.PdfStop;
    this.pdfService.run(action);
  }
  ngOnInit() {}
}
