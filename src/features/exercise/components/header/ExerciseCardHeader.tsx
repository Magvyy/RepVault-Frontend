import { type ExerciseEnum } from "@/shared/types/ExerciseAPI"
import { CardHeader } from "@/components/ui/card"
import clsx from "clsx"
import formatEnumToString from "@/shared/services/formatEnumToString"


interface ExerciseCardHeaderProps {
    type: ExerciseEnum
    className?: string
}
export default function ExerciseCardHeader({ type, className }: ExerciseCardHeaderProps) {


    return (
        <CardHeader className={clsx("base-class", className)}>
            <div className="w-full flex justify-center gap-[5px]">
                {formatEnumToString(type)}
            </div>
        </CardHeader>
    )
}