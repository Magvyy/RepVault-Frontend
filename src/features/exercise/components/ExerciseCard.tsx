import { type UIExercise } from "@/shared/types/ExerciseAPI"
import { Card } from "@/components/ui/card";
import ExerciseCardHeader from "./header/ExerciseCardHeader";
import ExerciseCardContent from "./content/ExerciseCardContent";
import React from "react";


interface ExerciseCardProps {
    exercise: UIExercise
}
export const ExerciseCard = React.memo(function ExerciseCard({ exercise }: ExerciseCardProps) {
    
    return(
        <Card className="flex flex-col justify-between w-fit gap-0 p-0">
            <div className="flex flex-col gap-0 p-0">
                <ExerciseCardHeader
                    type={exercise.type}
                    className="p-2"
                />
                <ExerciseCardContent
                    sets={exercise.sets}
                    className="p-2"
                />
            </div>
        </Card>
    )
})