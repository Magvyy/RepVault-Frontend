import { Button } from "@/components/ui/button";
import { SessionTableInput } from "@/features/session";
import { useApiCall } from "@/shared/hooks/handleApiCall";
import { convert_to_UI, convet_to_API } from "@/shared/types/Common";
import { type TemplateSessionResponse, type UISession } from "@/shared/types/SessionAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";




export default function SessionTemplatePage() {
    const { state, handleApiCall } = useApiCall<TemplateSessionResponse>()
    const [session, setSession] = useState<UISession>({
        clientId: crypto.randomUUID(),
        id: 0,
        name: "N/A",
        exercises: []
    })

    const { id } = useParams()

    useEffect(() => {
        handleApiCall({
            endpoint: `/sessions/templates/${id}`,
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
        const data = result.data as TemplateSessionResponse
        setSession(convert_to_UI(data))
    }, [state])

    const handleClick = () => {
        handleApiCall({
            endpoint: `/sessions/templates/${id}`,
            credentials: true,
            method: "PUT",
            body: JSON.stringify(convet_to_API(session))
        })
    }

    return (
        <div className="w-full h-full p-8 flex flex-col gap-5 justify-start items-center">
            <SessionTableInput
                session={session}
                setSession={setSession}
            />
            <Button onClick={handleClick}>Update Session Template</Button>
        </div>
    )
}
