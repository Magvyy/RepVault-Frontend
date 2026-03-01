import { TableCell, TableRow } from "@/components/ui/table";
import type { UISet } from "@/shared/types/SetAPI";
import { SetTypeSelector } from "./SetTypeSelector";
import { SetWeightInput } from "./SetWeightInput";
import { SetRepsInput } from "./SetRepsInput";
import clsx from "clsx";

interface SetProps {
    set: UISet
    updateSet: (set: UISet) => void
    className?: string
}
export function SetTableRow({ set, updateSet, className }: SetProps) {
    const updateField = <K extends keyof UISet>(key: K, value: UISet[K]) => {
        updateSet({ ...set, [key]: value })
    }

    const tableCellClassName = "flex justify-start";
    
    return(
        <TableRow className={clsx("base-class", className)}>
            <TableCell className={tableCellClassName}>
                <SetTypeSelector
                    type={set.type}
                    setType={(value) => updateField("type", value)}
                    className="w-full"
                />
            </TableCell>
            <TableCell className={tableCellClassName}>
                <SetWeightInput
                    weight={set.weight}
                    setWeight={(value) => updateField("weight", value)}
                    className="w-[40px]"
                />
            </TableCell>
            <TableCell className={tableCellClassName}>
                <SetRepsInput
                    reps={set.reps}
                    setReps={(value) => updateField("reps", value)}
                    className="w-[40px]"
                />
            </TableCell>
        </TableRow>
    )
}