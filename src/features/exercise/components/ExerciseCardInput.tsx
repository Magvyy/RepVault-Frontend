import { type UIExercise } from "@/shared/types/ExerciseAPI"
import type { SetEnum } from "@/shared/types/SetAPI";
import { Card } from "@/components/ui/card";
import ExerciseCardFooter from "./footer/ExerciseCardFooter";
import React, { useCallback } from "react";
import ExerciseCardHeaderInput from "./header/ExerciseCardHeaderInput";
import ExerciseCardContentInput from "./content/ExerciseCardContentInput";


interface ExerciseCardInputProps {
    exercise: UIExercise
    updateExercise: (exercise: UIExercise) => void
    removeExercise: (clientId: string) => void
}
export const ExerciseCardInput = React.memo(function ExerciseCard({ exercise, updateExercise, removeExercise }: ExerciseCardInputProps) {
    const createNewSet = useCallback(() => {
        const newSet = {
            clientId: crypto.randomUUID(),
            type: "NORMAL" as SetEnum,
            reps: 0,
            weight: 0
        }
        updateExercise({ ...exercise, ["sets"]: [...exercise.sets, newSet] })
    }, [updateExercise, exercise])

    const updateExerciseField = useCallback(<K extends keyof UIExercise>(key: K, value: UIExercise[K]) => {
        updateExercise({ ...exercise, [key]: value })
    }, [updateExercise, exercise])
    
    return(
        <Card className="flex flex-col justify-between w-full min-w-[350px] gap-0 p-0">
            <div className="flex flex-col gap-0 p-0">
                <ExerciseCardHeaderInput
                    clientId={exercise.clientId}
                    removeExercise={removeExercise}
                    type={exercise.type}
                    setType={(value) => updateExerciseField("type", value)}
                    className="p-2"
                />
                <ExerciseCardContentInput
                    sets={exercise.sets}
                    setSets={(value) => updateExerciseField("sets", value)}
                    className="p-2"
                />
            </div>
            <ExerciseCardFooter
                createNewSet={createNewSet}
                className="p-2"
            />
        </Card>
    )
})