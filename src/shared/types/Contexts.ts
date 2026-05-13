import React from "react";
import type { SessionResponse } from "./SessionAPI";
import type { UserResponse } from "./UserAPI";



export interface ActiveSessionContext {
    activeSession: SessionResponse | undefined,
    setActiveSession: React.Dispatch<React.SetStateAction<SessionResponse | undefined>>
}

export interface AuthContext {
    auth: UserResponse | undefined,
    setAuth: React.Dispatch<React.SetStateAction<UserResponse | undefined>>
}