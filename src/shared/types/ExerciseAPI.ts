import { ExerciseRequestDTOType } from "./ApiTypes";
import type { Id } from "./Common";
import type { UISet, SetRequest, SetResponse } from "./SetAPI";

export type ExerciseEnum = typeof ExerciseRequestDTOType[keyof typeof ExerciseRequestDTOType];
export const ExerciseTypes = Object.values(ExerciseRequestDTOType);

export interface UIExercise {
    clientId: string
    id?: number
    type: ExerciseEnum
    description: string
    sets: UISet[]
}

export interface ExerciseResponse extends Id {
    type: ExerciseEnum
    description: string
    sets: SetResponse[]
}

export interface ExerciseRequest {
    type: ExerciseEnum
    description: string
    sets: SetRequest[]
}