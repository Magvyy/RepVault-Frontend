import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SessionTableInput } from "@/features/session";
import { useApiCall } from "@/shared/hooks/useApiCall";
import { convet_to_API } from "@/shared/types/Common";
import { ExerciseTypes } from "@/shared/types/ExerciseAPI";
import type { SessionRequest, UISession } from "@/shared/types/SessionAPI";
import type { SetEnum } from "@/shared/types/SetAPI";
import { useState } from "react";





export default function CreateSessionPage() {
    const { handleApiCall } = useApiCall<SessionRequest>()
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
        <div className="w-full h-full p-8 flex flex-col items-center">
            <div className="w-2/5 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-[20px]">
                    <Input
                        className="w-full !bg-card"
                        onChange={(e) => setSession(prev => { return {...prev, name: e.target.value} })}
                        placeholder="Template name"
                    />
                    <SessionTableInput
                        className="flex flex-col w-full gap-[30px]"
                        session={session}
                        setSession={setSession}
                    />
                </div>
                <Button onClick={handleClick}>Create Session Template</Button>
            </div>
        </div>
    )
}
