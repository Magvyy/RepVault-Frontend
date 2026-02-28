import type { Id } from "./Common";

export type SetEnum =
    | "NORMAL"
    | "WARM_UP"
    | "FAILURE"
    | "DROP_SET"
    | "SUPER_SET";

export interface Set {
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