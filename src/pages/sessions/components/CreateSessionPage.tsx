import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SessionTableInput } from "@/features/session";
import { useApiCall } from "@/shared/hooks/handleApiCall";
import { convet_to_API } from "@/shared/types/Common";
import { ExerciseTypes } from "@/shared/types/ExerciseAPI";
import type { SessionRequest, UISession } from "@/shared/types/SessionAPI";
import type { SetEnum } from "@/shared/types/SetAPI";
import { useState } from "react";





export default function CreateSessionPage() {
    const { state, handleApiCall } = useApiCall<SessionRequest>()
    const [session, setSession] = useState<UISession>({
        clientId: crypto.randomUUID(),
        name: "",
        exercises: [{
            clientId: crypto.randomUUID(),
            type: ExerciseTypes[0],
            sets: [{
                clientId: crypto.randomUUID(),
                type: "NORMAL" as SetEnum,
                reps: 0,
                weight: 0
            }]
        }]
    })

    const handleClick = () => {
        handleApiCall({
            endpoint: "/sessions/templates",
            credentials: true,
            method: "POST",
            body: JSON.stringify(convet_to_API(session))
        })
    }

    return (
        <div className="w-full h-full p-8 flex flex-col justify-between items-center">
            <Input
                className="w-4/5 !bg-card"
                onChange={(e) => setSession(prev => { return {...prev, name: e.target.value} })}
            />
            <SessionTableInput
                session={session}
                setSession={setSession}
            />
            <Button onClick={handleClick}>Create Session Template</Button>
        </div>
    )
}
