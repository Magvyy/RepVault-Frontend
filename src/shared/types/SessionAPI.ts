import type { Temporal } from "@js-temporal/polyfill";
import type { Id } from "./Common";
import type { ExerciseResponse } from "./ExerciseAPI";


export interface SessionResponse extends Id {
    description: string
    exercises: ExerciseResponse[]
    start: Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime
}

export interface SessionRequest {
    description: string
    exercises: ExerciseResponse[]
    start: Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime
}