import type { Id, UI } from "./Common";
import type { UIExercise, ExerciseRequest, ExerciseResponse, ExerciseEnum, TemplateExerciseResponse, ActiveExerciseResponse, UIExerciseResponse } from "./ExerciseAPI";
import type { UserResponse } from "./UserAPI";


export interface UISession extends UI {
    user?: UserResponse
    id?: number
    volume?: number
    name: string
    description?: string
    exercises: UIExercise[]
    start?: string
    end?: string
}

export interface UISessionResponse extends Id, UI {
    user: UserResponse
    name: string
    description?: string
    volume: number
    exercises: UIExerciseResponse[]
    start: string
    end: string
}

export interface UISessionOverview extends Id, UI {
    name: string
    exercises: string[]
}

export interface SessionOverviewResponse extends Id {
    name: string
    exercises: ExerciseEnum[]
}

export interface TemplateSessionResponse extends Id {
    name: string
    exercises: TemplateExerciseResponse[]
}

export interface ActiveSessionResponse extends Id {
    name: string
    exercises: ActiveExerciseResponse[]
    start: string
}

export interface SessionResponse extends Id {
    user: UserResponse
    volume: number
    name: string
    description?: string
    exercises: ExerciseResponse[]
    start?: string
    end?: string
}

export interface SessionRequest {
    name: string
    description?: string
    exercises: ExerciseRequest[]
    start?: string
    end?: string
}