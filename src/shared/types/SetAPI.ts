import type { Id } from "./Common";

export type SetEnum =
    | "NORMAL"
    | "WARM_UP"
    | "FAILURE"
    | "DROP_SET"
    | "SUPER_SET";

export interface SetResponse extends Id {
    setType: SetEnum
    reps: number
    weight: number
}

export interface SetRequest {
    setType: SetEnum
    reps: number
    weight: number
}