import type { Temporal } from "@js-temporal/polyfill";
import type { Id } from "./Common";
import type { UIExercise, ExerciseRequest, ExerciseResponse } from "./ExerciseAPI";

export interface UISession {
    clientId: string
    id?: number
    description: string
    exercises: UIExercise[]
    start?: Temporal.ZonedDateTime
    end?: Temporal.ZonedDateTime
}

export interface SessionResponse extends Id {
    description: string
    exercises: ExerciseResponse[]
    start: Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime
}

export interface SessionRequest {
    description: string
    exercises: ExerciseRequest[]
}