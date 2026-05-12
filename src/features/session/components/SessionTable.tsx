import { ExerciseCard } from "@/features/exercise";
import type { UISession } from "@/shared/types/SessionAPI";
import clsx from "clsx";



interface SessionTableProps {
    session: UISession
    className?: string
}
export function SessionTable({ session, className }: SessionTableProps) {
    
    return (
        <div className={clsx("base-class", className)}>
            {session.exercises.map(exercise => 
                <ExerciseCard
                    key={exercise.clientId}
                    exercise={exercise}
                />
            )}
        </div>
    )
}