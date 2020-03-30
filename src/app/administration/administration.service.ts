import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { printMessage, pdfMessage } from "../model/machine";
import { MACHINE_ACTION_HTTP_HOST } from "../share/config";
import { Injectable } from "@angular/core";

export type PrintAction = printMessage.PrintStart | printMessage.PrintStop;

@Injectable({
  providedIn: "root"
})
export class PrintService {
  $data: Subject<PrintAction> = new Subject();
  public data$ = this.$data.asObservable();

  run(action: PrintAction) {
    this.$data.next(action);
  }
}

@Injectable({
  providedIn: "root"
})
export class PrintActionService {
  private url = `${MACHINE_ACTION_HTTP_HOST}/api/print`;
  constructor(private printService: PrintService, private http: HttpClient) {
    this.printService.data$.subscribe(action => {
      this.run(action);
      console.warn(action, "print action works");
    });
  }
  run(action: PrintAction) {
    if (action.__typename === printMessage.PrintMessageTypes.PrintStart) {
      return this.http.post(this.url, {});
    } else {
      return this.http.delete(this.url);
    }
  }
}

export type PdfAction = pdfMessage.PdfStart | pdfMessage.PdfStop;
@Injectable({
  providedIn: "root"
})
export class PdfService {
  private $data: Subject<PdfAction> = new Subject();
  public data$ = this.$data.asObservable();

  run(action: PdfAction) {
    this.$data.next(action);
  }
}

@Injectable({
  providedIn: "root"
})
export class PdfServiceAction {
  private url = `${MACHINE_ACTION_HTTP_HOST}/api/pdf`;
  constructor(private http: HttpClient, private pdfService: PdfService) {
    this.pdfService.data$.subscribe(action => {
      this.run(action);
      console.warn(action, "pdf action works");
    });
  }
  run(action: PdfAction) {
    if (action.__typename === pdfMessage.PdfMessageType.PdfStart) {
      return this.http.post(this.url, {});
    } else {
      return this.http.delete(this.url);
    }
  }
}
