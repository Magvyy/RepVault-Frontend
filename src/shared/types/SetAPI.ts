import { SetRequestDTOType } from "./ApiTypes";
import type { Id, UI } from "./Common";

export type SetEnum = typeof SetRequestDTOType[keyof typeof SetRequestDTOType];
export const SetTypes = Object.values(SetRequestDTOType)

export interface UISet extends UI {
    id?: number
    type: SetEnum
    reps: number
    weight: number
}

export interface UISetResponse extends UI, Id {
    type: SetEnum
    reps: number
    weight: number
}

export interface SetResponse extends Id {
    type: SetEnum
    reps: number
    weight: number
}

export interface SetRequest {
    type: SetEnum
    reps: number
    weight: number
}