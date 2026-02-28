import { Input } from "@/components/ui/input"
import clsx from "clsx"



interface SetRepsInputProps {
    reps: number
    setReps: (reps: number) => void
    className?: string
}
export function SetRepsInput({ reps, setReps, className }: SetRepsInputProps) {

    return(
        <Input
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className={clsx("base-class", className)}
        />
    )
}