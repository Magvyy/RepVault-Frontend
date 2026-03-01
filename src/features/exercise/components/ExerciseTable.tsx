import { type ExerciseEnum, type UIExercise, ExerciseTypes } from "@/shared/types/ExerciseAPI";
import { useState } from "react";
import { ExerciseTypeSelector } from "./ExerciseTypeSelector";
import { ExerciseDescriptionInput } from "./ExerciseDescriptionInput";
import { SetTable } from "@/features/set/components/SetTable";
import type { UISet, SetEnum } from "@/shared/types/SetAPI";


interface ExerciseTableProps {
    exercise?: UIExercise
}
export function ExerciseTable({ exercise }: ExerciseTableProps) {
    const [type, setType] = useState<ExerciseEnum>(exercise ? exercise.type : ExerciseTypes[0]);
    const [description, setDescription] = useState<string>(exercise ? exercise.description : "");
    const [sets, setSets] = useState<UISet[]>(exercise ? exercise.sets : [{
        clientId: crypto.randomUUID(),
        type: "NORMAL" as SetEnum,
        reps: 0,
        weight: 0
    }]);
    
    return(
        <div className="flex flex-col gap-[10px]">
            <ExerciseDescriptionInput
                description={description}
                setDescription={setDescription}
            />
            <ExerciseTypeSelector
                type={type}
                setType={setType}
                className="w-full"
            />
            <SetTable
                sets={sets}
                setSets={setSets}
            />
        </div>
    )
}