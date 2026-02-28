import type { Photo, Id } from "./Common";


export interface PostResponse extends Id, Photo {
    userName: string
}

export interface PostRequest extends Photo {
    userName: string
}