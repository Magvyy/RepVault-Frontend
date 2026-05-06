import { Input } from "@/components/ui/input"
import clsx from "clsx"



interface SetWeightInputProps {
    weight: number
    setWeight: (weight: number) => void
    className?: string
}
export function SetWeightInput({ weight, setWeight, className }: SetWeightInputProps) {
    const max = 2000;

    return(
        <Input
            value={weight}
            onChange={(e) => {
                const weightNum = Number(e.target.value);
                setWeight((weightNum < 2000) ? weightNum : max)
            }}
            className={clsx("base-class", className)}
            max={max}
        />
    )
}