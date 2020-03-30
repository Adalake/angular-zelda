export namespace printMessage {
  export enum PrintMessageTypes {
    PrintStart = "PrintStart",
    PrintStop = "PrintStop"
  }
  export interface PrintStart {
    __typename: PrintMessageTypes.PrintStart;
  }
  export interface PrintStop {
    __typename: PrintMessageTypes.PrintStop;
  }
}

export namespace pdfMessage {
  export enum PdfMessageType {
    PdfStart = "PdfStart",
    PdfStop = "PdfStop"
  }
  export interface PdfStart {
    __typename: PdfMessageType.PdfStart;
    tube_voltage: TubeVoltage[];
  }
  export interface PdfStop {
    __typename: PdfMessageType.PdfStop;
    result: 0 | 1;
  }
  export type TubeVoltage = 80 | 100 | 120 | 140;
}
