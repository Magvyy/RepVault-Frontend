import { type UIExercise } from "@/shared/types/ExerciseAPI"
import type { SetEnum } from "@/shared/types/SetAPI";
import { Card } from "@/components/ui/card";
import ExerciseCardHeader from "./header/ExerciseCardHeader";
import ExerciseCardFooter from "./footer/ExerciseCardFooter";
import ExerciseCardContent from "./content/ExerciseCardContent";
import React from "react";


interface ExerciseCardProps {
    exercise: UIExercise
    updateExercise: (exercise: UIExercise) => void
    removeExercise: (clientId: string) => void
}
export const ExerciseCard = React.memo(function ExerciseCard({ exercise, updateExercise, removeExercise }: ExerciseCardProps) {
    const createNewSet = () => {
        const newSet = {
            clientId: crypto.randomUUID(),
            type: "NORMAL" as SetEnum,
            reps: 0,
            weight: 0
        }
        updateExercise({ ...exercise, ["sets"]: [...exercise.sets, newSet] })
    }

    console.log("rerendered exercise card: " + exercise.clientId);

    const updateExerciseField = <K extends keyof UIExercise>(key: K, value: UIExercise[K]) => {
        updateExercise({ ...exercise, [key]: value })
    }
    
    return(
        <Card className="flex flex-col gap-0 p-0">
            <ExerciseCardHeader
                clientId={exercise.clientId}
                removeExercise={removeExercise}
                description={exercise.description}
                setDescription={(value) => updateExerciseField("description", value)}
                type={exercise.type}
                setType={(value) => updateExerciseField("type", value)}
                className="p-2"
            />
            <ExerciseCardContent
                sets={exercise.sets}
                setSets={(value) => updateExerciseField("sets", value)}
                className="p-2"
            />
            <ExerciseCardFooter
                createNewSet={createNewSet}
                className="p-2"
            />
        </Card>
    )
})