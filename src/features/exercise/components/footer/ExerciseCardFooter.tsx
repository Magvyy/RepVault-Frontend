import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import clsx from "clsx"





interface ExerciseCardFooterProps {
    createNewSet: () => void
    className?: string
}
export default function ExerciseCardFooter({ createNewSet, className }: ExerciseCardFooterProps) {


    return (
        <CardFooter className={clsx("base-class", className)}>
            <Button variant="outline" className="w-full" onClick={createNewSet}>
                Add Set
            </Button>
        </CardFooter>
    )
}