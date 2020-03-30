import { TagID, TypedItem } from "src/app/model/share";
import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import { Patient } from "src/app/model/patient";
import { Study } from "src/app/model/study";
import { Protocol } from "src/app/model/protocol";
import { Scan } from "src/app/model/scan";

export interface StoreService<T extends TagID<string, any>> {
  queryMany(...ids: T["id"][]): Observable<T[]>;
}

export interface RichQueryStore<T extends TypedItem<any, string, any, any>> {
  queryAll(): Observable<T[]>;
}

// data-provider这层对外都是使用以下token的形式
export type IPatientDataService = StoreService<Patient>;
export const PatientDataToken = new InjectionToken<IPatientDataService>(
  "PatientDataService"
);

export type IStudyService = StoreService<Study>;
export const StudyDataToken = new InjectionToken<IStudyService>(
  "StudyDataService"
);

export type IProtocolService = StoreService<Protocol>;
export const ProtocolDataToken = new InjectionToken<IProtocolService>(
  "ProtocolDataService"
);

export type IScanService = StoreService<Scan>;
export const ScanDataToken = new InjectionToken<IScanService>(
  "ScanService"
);
