import { ExerciseRequestDTOType } from "./ApiTypes";
import type { Id, UI } from "./Common";
import type { UISet, SetRequest, SetResponse, UISetResponse } from "./SetAPI";

export type ExerciseEnum = typeof ExerciseRequestDTOType[keyof typeof ExerciseRequestDTOType];
export const ExerciseTypes = Object.values(ExerciseRequestDTOType);

export interface UIExercise extends UI {
    id?: number
    type: ExerciseEnum
    description?: string
    sets: UISet[]
}

export interface UIExerciseResponse extends UI, Id {
    type: ExerciseEnum
    description?: string
    sets: UISetResponse[]
}

export interface TemplateExerciseResponse extends Id {
    type: ExerciseEnum
    sets: SetResponse[]
}

export interface ActiveExerciseResponse extends Id {
    type: ExerciseEnum
    sets: SetResponse[]
}

export interface ExerciseResponse extends Id {
    type: ExerciseEnum
    description?: string
    sets: SetResponse[]
}

export interface ExerciseRequest {
    type: ExerciseEnum
    description: string
    sets: SetRequest[]
}