import { UserTypeDTOType } from "./ApiTypes"
import type { Photo, Id } from "./Common"

export type UserEnum = typeof UserTypeDTOType[keyof typeof UserTypeDTOType]
export const UserTypes = Object.values(UserTypeDTOType)

export interface UIUser {
    id?: number
    clientId: string
    user_name: string
    relation?: Relation
}

export interface Relation {
    can_add: boolean
    can_accept: boolean
}

export interface UserResponse extends Id, Photo, Relation {
    user_name: string
}

export interface UserRequest extends Photo {
    user_name: string
}