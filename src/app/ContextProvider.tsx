import { useApiCall } from "@/shared/hooks/handleApiCall";
import type { ActiveSessionContext } from "@/shared/types/Contexts";
import type { SessionResponse } from "@/shared/types/SessionAPI";
import { Temporal } from "@js-temporal/polyfill";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<ActiveSessionContext | undefined>(undefined)


export default function ContextProvider({ children }: { children: React.ReactNode }) {
    const [activeSession, setActiveSession] = useState<SessionResponse | undefined>(undefined)
    const { state, handleApiCall } = useApiCall<SessionResponse>()

    useEffect(() => {
        handleApiCall({
            endpoint: "/sessions/active",
            credentials: true,
            method: "GET"
        })
    }, [])

    useEffect(() => {
        if (state.loading || !state.result) return
        const result = state.result;
        if (result.error) {
            console.log(result.error)
            return
        }
        if (!result.data || typeof result.data === "string") return
        const data = result.data as SessionResponse
        setActiveSession({ ...data, start: Temporal.Instant.from(data.start as unknown as string).toZonedDateTimeISO(Temporal.Now.timeZoneId()).toString() })
    }, [state])

    return (
        <SessionContext value={{ activeSession, setActiveSession }}>
            {children}
        </SessionContext>
    )
}

export const useActiveSession = () => {
    const context = useContext(SessionContext)
    if (context === undefined) throw new Error("Context accessesed before initialization")
    const { activeSession, setActiveSession } = context
    return { activeSession, setActiveSession }
}