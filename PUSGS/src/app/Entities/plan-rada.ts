import { PlanRadaBasicInfo } from "./plan-rada-basic-info";
import { PlanRadaEquipments } from "./plan-rada-equipment";
import { PlanRadaHistoryOfChanges } from "./plan-rada-history-of-changes";
import { PlanRadaMultimedia } from "./plan-rada-multimedia";

export class PlanRada {
    basicinfo: PlanRadaBasicInfo;
    historyofchanges: PlanRadaHistoryOfChanges;
    multimedia: PlanRadaMultimedia;
    equipments: Array<PlanRadaEquipments>;
}