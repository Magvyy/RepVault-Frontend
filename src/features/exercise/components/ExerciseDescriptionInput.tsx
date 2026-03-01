import { Input } from "@/components/ui/input"
import clsx from "clsx"



interface ExerciseDescriptionInputProps {
    description: string
    setDescription: (description: string) => void
    className?: string
}
export function ExerciseDescriptionInput({ description, setDescription, className }: ExerciseDescriptionInputProps) {

    return(
        <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={clsx("base-class", className)}
        />
    )
}