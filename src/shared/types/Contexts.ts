import React from "react";
import type { SessionResponse } from "./SessionAPI";



export interface ActiveSessionContext {
    activeSession: SessionResponse | undefined,
    setActiveSession: React.Dispatch<React.SetStateAction<SessionResponse | undefined>>
}