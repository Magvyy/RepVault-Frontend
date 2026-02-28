


export interface Id {
    id: number
}

export interface Photo {
    url: string | null
}

export type ApiResult<T extends Id | string> =
    | { data: T; error: undefined }
    | { data: undefined; error: string }

export type ApiState<T extends Id | string> =
    | { called: false; loading: false; result: undefined }
    | { called: true; loading: true; result: undefined }
    | { called: true; loading: false; result: ApiResult<T> }