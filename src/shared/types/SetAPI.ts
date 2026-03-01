import { SetRequestDTOType } from "./ApiTypes";
import type { Id } from "./Common";

export type SetEnum = typeof SetRequestDTOType[keyof typeof SetRequestDTOType];
export const SetTypes = Object.values(SetRequestDTOType)

export interface UISet {
    clientId: string
    id?: number
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