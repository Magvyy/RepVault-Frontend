import { ExerciseTypes, type ExerciseEnum } from "@/shared/types/ExerciseAPI"
import Remover from "@/shared/components/Remover"
import { CardHeader } from "@/components/ui/card"
import clsx from "clsx"
import { EnumSelector } from "@/shared/components/EnumSelector"





interface ExerciseCardHeaderInputProps {
    clientId: string
    removeExercise: (clientId: string) => void
    type: ExerciseEnum
    setType: (type: ExerciseEnum) => void
    className?: string
}
export default function ExerciseCardHeaderInput({ clientId, removeExercise, type, setType, className }: ExerciseCardHeaderInputProps) {


    return (
        <CardHeader className={clsx("base-class", className)}>
            <div className="w-full flex gap-[5px]">
                <EnumSelector
                    type={type}
                    setType={setType}
                    types={ExerciseTypes}
                    className="w-full text-[18px]"
                />
                <Remover
                    clientId={clientId}
                    remove={removeExercise}
                />
            </div>
        </CardHeader>
    )
}