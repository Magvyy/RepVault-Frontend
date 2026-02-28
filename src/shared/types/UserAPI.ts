import type { Photo, Id } from "./Common";


export interface UserResponse extends Id, Photo {
    userName: string
}

export interface UserRequest extends Photo {
    userName: string
}