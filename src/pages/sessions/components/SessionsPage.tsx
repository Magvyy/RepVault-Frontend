import { useActiveSession } from "@/app/ContextProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApiCall } from "@/shared/hooks/useApiCall";
import formatEnumToString from "@/shared/services/formatEnumToString";
import { convert_to_UI } from "@/shared/types/Common";
import { type SessionOverviewResponse, type SessionResponse, type UISessionOverview } from "@/shared/types/SessionAPI";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export default function SessionsPage() {
    const { state: sessionsState, handleApiCall: handleSessionsApiCall } = useApiCall<SessionOverviewResponse[]>()
    const { state: sessionState, handleApiCall: handleSessionApiCall } = useApiCall<SessionResponse>()
    const [sessions, setSessions] = useState<UISessionOverview[]>([])
    const { activeSession, setActiveSession } = useActiveSession()
    const navigate = useNavigate()

    useEffect(() => {
        handleSessionsApiCall({
            endpoint: "/sessions/templates?offset=0",
            credentials: true,
            method: "GET"
        })
    }, [])

    useEffect(() => {
        if (sessionsState.loading || !sessionsState.result) return
        const result = sessionsState.result;
        if (result.error) {
            console.log(result.error)
            return
        }
        if (!result.data || typeof result.data === "string") return
        let data = result.data as SessionOverviewResponse[]
        setSessions(prev => {
            const ids = prev.map(s => s.id)
            data = data.filter(s => !ids.includes(s.id))
            return [...prev, ...data.map(e => convert_to_UI<UISessionOverview>(e))]
        })
    }, [sessionsState])

    const startSession = useCallback((id: number) => {
        if (activeSession) return
        handleSessionApiCall({
            endpoint: `/sessions/templates/${id}/start`,
            credentials: true,
            method: "GET"
        })
    }, [])

    useEffect(() => {
        if (sessionState.loading || !sessionState.result) return
        const result = sessionState.result;
        if (result.error) {
            console.log(result.error)
            return
        }
        if (!result.data || typeof result.data === "string") return
        const data = result.data as SessionResponse
        setActiveSession(data)
    }, [sessionState])

    return (
        <div className="w-full h-full p-8 flex flex-col gap-5 justify-start items-center">
            <div className="flex flex-wrap gap-5">
                {sessions.map(s => {
                    const exercises = s.exercises.map(e => formatEnumToString(e as unknown as string))
                    return (
                        <Card key={s.clientId} className="p-2 w-[200px]" onClick={(e) => navigate(`/sessions/templates/${s.id}`)}>
                            <h1>{s.name}</h1>
                            <h2 className="text-gray-500">{exercises.slice(1).reduce((acc, cur) => acc + ", " + cur, exercises[0])}</h2>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                startSession(s.id as number)
                            }}>Start</Button>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
