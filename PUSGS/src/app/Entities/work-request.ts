import { WorkRequestBasicInfo } from "./work-request-basic-info";
import { WorkRequestEquipments } from "./work-request-equipments";
import { WorkRequestHistoryOfChanges } from "./work-request-history-of-changes";
import { WorkRequestMultimedia } from "./work-request-multimedia";

export class WorkRequest {
    basicinfo: WorkRequestBasicInfo;
    historyofchanges: Array<WorkRequestHistoryOfChanges>;
    multimedia: Array<WorkRequestMultimedia>;
    equipments: Array<WorkRequestEquipments>;

    constructor(){}
}
