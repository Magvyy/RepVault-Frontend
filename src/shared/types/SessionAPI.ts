import type { Temporal } from "@js-temporal/polyfill";
import type { Id } from "./Common";
import type { Exercise, ExerciseRequest, ExerciseResponse } from "./ExerciseAPI";

export interface Session {
    description: string
    exercises: Exercise[]
    start: Temporal.ZonedDateTime | undefined
    end: Temporal.ZonedDateTime | undefined
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