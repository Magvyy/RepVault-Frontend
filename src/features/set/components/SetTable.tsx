import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SetTableRow } from "./SetTableRow"
import type { UISet } from "@/shared/types/SetAPI"
import React from "react"

interface SetTableProps {
    sets: UISet[]
}
export const SetTable = React.memo( function SetTable({ sets }: SetTableProps) {

    return (
        <Table className="flex flex-col w-[400px] border-1 rounded-[10px]">
            <TableHeader className="sticky top-0 z-1">
                <TableRow className={`w-full grid grid-cols-[2fr_1fr_1fr] gap-4`}>
                    <TableHead className="flex justify-center items-center px-4 py-0">Set</TableHead>
                    <TableHead className="flex justify-center items-center px-4 py-0">Kg</TableHead>
                    <TableHead className="flex justify-center items-center px-4 py-0">Reps</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="max-h-[200px] overflow-auto scrollbar-hide">
                {sets.map((set, key) => 
                    <SetTableRow
                        key={key}
                        set={set}
                        className={`w-full grid grid-cols-[2fr_1fr_1fr] gap-4`}
                    />
                )}
            </TableBody>
        </Table>
    )
})