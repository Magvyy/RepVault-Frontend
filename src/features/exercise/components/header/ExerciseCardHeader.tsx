import type { ExerciseEnum } from "@/shared/types/ExerciseAPI"
import { ExerciseTypeSelector } from "./ExerciseTypeSelector"
import { ExerciseDescriptionInput } from "./ExerciseDescriptionInput"
import Remover from "@/shared/components/Remover"
import { CardHeader } from "@/components/ui/card"
import clsx from "clsx"





interface ExerciseCardHeaderProps {
    clientId: string
    removeExercise: (clientId: string) => void
    description: string
    setDescription: (description: string) => void
    type: ExerciseEnum
    setType: (type: ExerciseEnum) => void
    className?: string
}
export default function ExerciseCardHeader({ clientId, removeExercise, description, setDescription, type, setType, className }: ExerciseCardHeaderProps) {


    return (
        <CardHeader className={clsx("base-class", className)}>
            <div className="w-full flex gap-[5px]">
                <ExerciseTypeSelector
                    type={type}
                    setType={setType}
                    className="w-full text-[18px]"
                />
                <Remover
                    clientId={clientId}
                    remove={removeExercise}
                />
            </div>
            <ExerciseDescriptionInput
                description={description}
                setDescription={setDescription}
                className="w-full"
            />
        </CardHeader>
    )
}