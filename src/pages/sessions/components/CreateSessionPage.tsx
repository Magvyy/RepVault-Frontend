import { SessionTable } from "@/features/session";
import { ExerciseTypes } from "@/shared/types/ExerciseAPI";
import type { UISession } from "@/shared/types/SessionAPI";
import type { SetEnum } from "@/shared/types/SetAPI";
import { useState } from "react";





export default function CreateSessionPage() {
    const [session, setSession] = useState<UISession>({
        clientId: crypto.randomUUID(),
        name: "",
        description: "",
        exercises: [{
            clientId: crypto.randomUUID(),
            type: ExerciseTypes[0],
            description: "",
            sets: [{
                clientId: crypto.randomUUID(),
                type: "NORMAL" as SetEnum,
                reps: 0,
                weight: 0
            }]
        }]
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleClick();
    }

    const handleClick = () => {

    }

    return (
        <div className="w-full p-8 flex flex-col justify-center items-center">
            <SessionTable
                session={session}
            />
        </div>
    )
}