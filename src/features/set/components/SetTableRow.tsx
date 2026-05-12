import { TableCell, TableRow } from "@/components/ui/table"
import formatEnumToString from "@/shared/services/formatEnumToString"
import { type UISet } from "@/shared/types/SetAPI"
import clsx from "clsx"
import React from "react"

interface SetTableRowProps {
    set: UISet
    className?: string
}
export const SetTableRow = React.memo(function SetTableRow({ set, className }: SetTableRowProps) {

    const tableCellClassName = "flex justify-center"
    
    return(
        <TableRow className={clsx("base-class", className)}>
            <TableCell className={tableCellClassName}>
                {formatEnumToString(set.type)}
            </TableCell>
            <TableCell className={tableCellClassName}>
                {set.weight}
            </TableCell>
            <TableCell className={tableCellClassName}>
                {set.reps}
            </TableCell>
        </TableRow>
    )
})