import { Button } from "@/components/ui/button";
import { ExerciseCardInput } from "@/features/exercise";
import { ExerciseTypes, type UIExercise } from "@/shared/types/ExerciseAPI";
import type { UISession } from "@/shared/types/SessionAPI";
import type { SetEnum } from "@/shared/types/SetAPI";
import { useCallback, useEffect } from "react";



interface SessionTableInputProps {
    session: UISession
    setSession: React.Dispatch<React.SetStateAction<UISession>>
}
export function SessionTableInput({ session, setSession }: SessionTableInputProps) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("sessionDraft", JSON.stringify(session));
        }, 1000);

        return () => clearTimeout(timeout);
    }, [session]);

    // useEffect(() => {
    //     const draft = localStorage.getItem("sessionDraft");
    //     if (!draft) return;
        
    //     const session = JSON.parse(draft);
    //     setSession(session);
    // }, []);

    const createNewExercise = useCallback(() => {
        const newExercise = {
            clientId: crypto.randomUUID(),
            type: ExerciseTypes[0],
            sets: [{
                clientId: crypto.randomUUID(),
                type: "NORMAL" as SetEnum,
                reps: 0,
                weight: 0
            }]
        }
        setSession(prev => ({...prev, exercises: [...prev.exercises, newExercise]}))
    }, [setSession])

    const updateExercise = useCallback((exercise: UIExercise) => {
        setSession(prev => ({...prev, exercises: prev.exercises.map(elem => (elem.clientId === exercise.clientId) ? exercise : elem)}))
    }, [setSession])
    
    const removeExercise = useCallback((clientId: string) => {
        setSession(prev => ({...prev, exercises: prev.exercises.filter(elem => elem.clientId !== clientId)}))
    }, [setSession])
    
    return (
        <div className="flex flex-col w-4/5 gap-[30px]">
            <div className="flex flex-wrap justify-center w-full gap-[30px]">
                {session.exercises.map(exercise => 
                    <ExerciseCardInput
                        key={exercise.clientId}
                        exercise={exercise}
                        updateExercise={updateExercise}
                        removeExercise={removeExercise}
                    />
                )}
            </div>
            
            <div className="p-2 pt-4">
                <Button className="w-fit" onClick={createNewExercise}>
                    Add Exercise
                </Button>
            </div>
        </div>
    )
}