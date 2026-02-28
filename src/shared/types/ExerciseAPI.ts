import type { Id } from "./Common";
import type { SetRequest, SetResponse } from "./SetAPI";

export type ExerciseEnum =
    | "";

export interface ExerciseResponse extends Id {
    exerciseType: ExerciseEnum
    description: string
    sets: SetResponse[]
}

export interface ExerciseRequest {
    exerciseType: ExerciseEnum
    description: string
    sets: SetRequest[]
}