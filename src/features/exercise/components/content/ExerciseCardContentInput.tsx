import { CardContent } from "@/components/ui/card"
import { SetTableInput } from "@/features/set"
import type { UISet } from "@/shared/types/SetAPI"
import clsx from "clsx"



interface ExerciseCardContentInputProps {
    sets: UISet[]
    setSets: (sets: UISet[]) => void
    className?: string
}
export default function ExerciseCardContentInput({ sets, setSets, className }: ExerciseCardContentInputProps) {

    return (
        <CardContent className={clsx("base-class", className)}>
            <SetTableInput
                sets={sets}
                setSets={setSets}
            />
        </CardContent>
    )
}