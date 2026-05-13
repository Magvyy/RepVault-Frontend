import { useApiCall } from "@/shared/hooks/useApiCall"
import type { ActiveSessionContext, AuthContext } from "@/shared/types/Contexts"
import type { SessionResponse } from "@/shared/types/SessionAPI"
import type { UserResponse } from "@/shared/types/UserAPI"
import { Temporal } from "@js-temporal/polyfill"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

const SessionContext = createContext<ActiveSessionContext | undefined>(undefined)
const AuthContext = createContext<AuthContext | undefined>(undefined)


export const ContextProvider = React.memo(({ children }: { children: React.ReactNode }) => {
    const [activeSession, setActiveSession] = useState<SessionResponse | undefined>(undefined)
    const { state: activeSessionState, handleApiCall: handleActiveSessionApiCall } = useApiCall<SessionResponse>()

    const [auth, setAuth] = useState<UserResponse | undefined>(undefined)
    const { state: authState, handleApiCall: handleAuthApiCall } = useApiCall<UserResponse>()

    useEffect(() => {
        handleAuthApiCall({
            endpoint: "/auth/me",
            credentials: true,
            method: "GET"
        })
    }, [])

    useEffect(() => {
        if (!auth) return
        handleActiveSessionApiCall({
            endpoint: "/sessions/active",
            credentials: true,
            method: "GET"
        })
    }, [auth])

    useEffect(() => {
        if (activeSessionState.loading || !activeSessionState.result) return
        const result = activeSessionState.result;
        if (result.error || !result.data || typeof result.data === "string") return
        const data = result.data as SessionResponse
        setActiveSession({ ...data, start: Temporal.Instant.from(data.start as unknown as string).toZonedDateTimeISO(Temporal.Now.timeZoneId()).toString() })
    }, [activeSessionState])

    useEffect(() => {
        if (authState.loading || !authState.result) return
        const result = authState.result;
        if (result.error || !result.data || typeof result.data === "string") return
        const data = result.data as UserResponse
        setAuth(data)
    }, [authState])

    const authValue = useMemo(() => {
        if (!auth) setActiveSession(undefined)
        return {auth, setAuth}
    }, [auth])
    const sessionValue = useMemo(() => ({activeSession, setActiveSession}), [activeSession])

    return (
        <AuthContext value={authValue}>
            <SessionContext value={sessionValue}>
                {children}
            </SessionContext>
        </AuthContext>
    )
})

export const useActiveSession = () => {
    const context = useContext(SessionContext)
    if (context === undefined) throw new Error("Context accessesed before initialization")
    const { activeSession, setActiveSession } = context
    return { activeSession, setActiveSession }
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) throw new Error("Context accessesed before initialization")
    const { auth, setAuth } = context
    return { auth, setAuth }
}