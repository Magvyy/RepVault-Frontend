import { Input } from "@/components/ui/input"
import clsx from "clsx"



interface SetWeightInputProps {
    weight: number
    setWeight: (weight: number) => void
    className?: string
}
export function SetWeightInput({ weight, setWeight, className }: SetWeightInputProps) {

    return(
        <Input
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className={clsx("base-class", className)}
        />
    )
}