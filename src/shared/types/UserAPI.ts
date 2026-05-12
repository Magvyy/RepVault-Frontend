import type { Photo, Id } from "./Common";

export interface UIUser {
    id?: number
    clientId: string
    user_name: string
}

export interface UserResponse extends Id, Photo {
    user_name: string
}

export interface UserRequest extends Photo {
    user_name: string
}