import { TableCell, TableRow } from "@/components/ui/table";
import { SetTypes, type UISet } from "@/shared/types/SetAPI";
import { SetWeightInput } from "./SetWeightInput";
import { SetRepsInput } from "./SetRepsInput";
import clsx from "clsx";
import Remover from "@/shared/components/Remover";
import React from "react";
import { EnumSelector } from "@/shared/components/EnumSelector";

interface SetTableRowInputProps {
    set: UISet
    updateSet: (set: UISet) => void
    removeSet: (clientId: string) => void
    className?: string
}
export const SetTableRowInput = React.memo(function SetTableRow({ set, updateSet, removeSet, className }: SetTableRowInputProps) {
    const updateSetField = <K extends keyof UISet>(key: K, value: UISet[K]) => {
        updateSet({ ...set, [key]: value })
    }

    const tableCellClassName = "flex justify-start";
    
    return(
        <TableRow className={clsx("base-class", className)}>
            <TableCell className={tableCellClassName}>
                <EnumSelector
                    type={set.type}
                    setType={(value) => updateSetField("type", value)}
                    types={SetTypes}
                    className="w-full border-none"
                />
            </TableCell>
            <TableCell className={tableCellClassName}>
                <SetWeightInput
                    weight={set.weight}
                    setWeight={(value) => updateSetField("weight", value)}
                    className="w-full border-none text-center"
                />
            </TableCell>
            <TableCell className={tableCellClassName}>
                <SetRepsInput
                    reps={set.reps}
                    setReps={(value) => updateSetField("reps", value)}
                    className="w-full border-none text-center"
                />
            </TableCell>
            <TableCell className={tableCellClassName}>
                <Remover
                    clientId={set.clientId}
                    remove={removeSet}
                    className="w-full"
                />
            </TableCell>
        </TableRow>
    )
})