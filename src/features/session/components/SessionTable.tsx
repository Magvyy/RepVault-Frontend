import { Button } from "@/components/ui/button";
import { ExerciseCard } from "@/features/exercise";
import { ExerciseTypes, type UIExercise } from "@/shared/types/ExerciseAPI";
import type { UISession } from "@/shared/types/SessionAPI";
import type { SetEnum } from "@/shared/types/SetAPI";
import { useEffect, useState } from "react";



interface SessionTableProps {
    session: UISession
}
export function SessionTable(props: SessionTableProps) {
    const [session, setSession] = useState<UISession>(props.session);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("sessionDraft", JSON.stringify(session));
        }, 1000);

        return () => clearTimeout(timeout);
    }, [session]);

    useEffect(() => {
        const draft = localStorage.getItem("sessionDraft");
        if (!draft) return;
        
        const session = JSON.parse(draft);
        setSession(session);
    }, []);

    const createNewExercise = () => {
        const newExercise = {
            clientId: crypto.randomUUID(),
            type: ExerciseTypes[0],
            description: "",
            sets: [{
                clientId: crypto.randomUUID(),
                type: "NORMAL" as SetEnum,
                reps: 0,
                weight: 0
            }]
        }
        updateSessionField("exercises", [...session.exercises, newExercise]);
    }

    const updateSessionField = <K extends keyof UISession>(key: K, value: UISession[K]) => {
        setSession({ ...session, [key]: value });
    }

    const updateExercise = (exercise: UIExercise) => {
        updateSessionField("exercises", session.exercises.map(elem => (elem.clientId === exercise.clientId) ? exercise : elem));
    }
    
    const removeExercise = (clientId: string) => {
        updateSessionField("exercises", session.exercises.filter(elem => elem.clientId !== clientId));
    }
    
    return (
        <div className="flex flex-col gap-[30px]">
            {session.exercises.map(exercise => 
                <ExerciseCard
                    key={exercise.clientId}
                    exercise={exercise}
                    updateExercise={updateExercise}
                    removeExercise={removeExercise}
                />
            )}
            
            <div className="p-2 pt-4">
                <Button className="w-full" onClick={createNewExercise}>
                    Add Exercise
                </Button>
            </div>
        </div>
    )
}