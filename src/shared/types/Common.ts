import { ExerciseTypes } from "./ExerciseAPI";
import { SetTypes } from "./SetAPI";

export interface Id {
    id: number
}

export interface UI {
    clientId: string
}

export interface Photo {
    url: string | null
}

export type ApiResult<T> =
    | { data: T; error: undefined }
    | { data: undefined; error: string }

export type ApiState<T> =
    | { called: false; loading: false; result: undefined }
    | { called: true; loading: true; result: undefined }
    | { called: true; loading: false; result: ApiResult<T> }

export const convet_to_API = <T extends UI>(data: T): T => {
    delete (data as any).clientId;
    (Object.keys(data) as Array<keyof typeof data>).forEach(key => {
        const v = (data as any)[key];
        data[key] = (Array.isArray(v) && v.some(item => typeof item === "object"))
            ? v.map(i => convet_to_API(i))
            : v;
    })
    return data;
}

export const convert_to_UI = <T extends UI>(data: Object): T => {
    (Object.keys(data) as Array<keyof typeof data>).forEach(key => {
        const v = (data as any)[key];
        data[key] = (Array.isArray(v) && v.some(item => typeof item === "object"))
            ? v.map(i => convert_to_UI(i))
            : v;
    })
    return { ...data, clientId: crypto.randomUUID() } as T;
}