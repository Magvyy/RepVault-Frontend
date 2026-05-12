import { SessionTable } from "@/features/session";
import { useApiCall } from "@/shared/hooks/handleApiCall";
import { convert_to_UI } from "@/shared/types/Common";
import { type SessionResponse, type UISession  } from "@/shared/types/SessionAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";




export default function SessionPage() {
    const { state, handleApiCall } = useApiCall<SessionResponse>()
    const [session, setSession] = useState<UISession | undefined>(undefined)

    const { id } = useParams()
    
    useEffect(() => {
        handleApiCall({
            endpoint: `/sessions/${id}`,
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
        setSession(convert_to_UI(data))
    }, [state])

    if (!session) return

    return (
        <div className="w-full h-full p-8 flex flex-col gap-5 justify-start items-center">
            <SessionTable
                session={session}
                className="flex flex-col justify-center w-fit gap-[30px]"
            />
        </div>
    )
}
