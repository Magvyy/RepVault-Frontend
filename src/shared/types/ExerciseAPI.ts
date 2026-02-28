import type { Id } from "./Common";
import type { Set, SetRequest, SetResponse } from "./SetAPI";

export interface Exercise {
    type: string
    description: string
    sets: Set[]
}

export interface ExerciseResponse extends Id {
    type: string
    description: string
    sets: SetResponse[]
}

export interface ExerciseRequest {
    type: string
    description: string
    sets: SetRequest[]
}