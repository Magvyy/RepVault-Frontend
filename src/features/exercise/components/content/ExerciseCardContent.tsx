import { CardContent } from "@/components/ui/card"
import { SetTable } from "@/features/set"
import type { UISet } from "@/shared/types/SetAPI"
import clsx from "clsx"



interface ExerciseCardContentProps {
    sets: UISet[]
    setSets: (sets: UISet[]) => void
    className?: string
}
export default function ExerciseCardContent({ sets, setSets, className }: ExerciseCardContentProps) {

    return (
        <CardContent className={clsx("base-class", className)}>
            <SetTable
                sets={sets}
                setSets={setSets}
            />
        </CardContent>
    )
}