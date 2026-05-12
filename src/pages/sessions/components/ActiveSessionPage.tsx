import { useActiveSession } from "@/app/ContextProvider";
import { Button } from "@/components/ui/button";
import { SessionTable, SessionTableInput } from "@/features/session";
import { useApiCall } from "@/shared/hooks/handleApiCall";
import { convert_to_UI, convet_to_API } from "@/shared/types/Common";
import { type ActiveSessionResponse, type UISession } from "@/shared/types/SessionAPI";
import { useCallback, useEffect, useState } from "react";




export default function ActiveSessionPage() {
    const { activeSession, setActiveSession } = useActiveSession()
    if (!activeSession) return

    const { state, handleApiCall } = useApiCall<ActiveSessionResponse>()
    const [session, setSession] = useState<UISession>(convert_to_UI(activeSession))

    useEffect(() => {
        if (state.loading || !state.result) return
        const result = state.result;
        if (result.error) {
            console.log(result.error)
            return
        }
        if (!result.data || typeof result.data === "string") return
        setActiveSession(undefined)
    }, [state])

    const handleClick = useCallback((session: UISession) => {
        handleApiCall({
            endpoint: `/sessions/active/${activeSession.id}`,
            credentials: true,
            method: "PUT",
            body: JSON.stringify(convet_to_API(session))
        })
    }, [])


    return (
        <div className="w-full h-full p-8 flex flex-col gap-5 justify-start items-center">
            <SessionTableInput
                session={session}
                setSession={setSession}
            />
            <Button onClick={e => handleClick(session)}>Finish Session</Button>
        </div>
    )
}
