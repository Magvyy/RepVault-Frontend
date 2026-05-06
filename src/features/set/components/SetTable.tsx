import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SetTableRow } from "./SetTableRow";
import type { UISet } from "@/shared/types/SetAPI";
import React from "react";

interface SetTableProps {
    sets: UISet[]
    setSets: (sets: UISet[]) => void
}
export const SetTable = React.memo( function SetTable({ sets, setSets }: SetTableProps) {
    const updateSet = (set: UISet) => {
        setSets(sets.map(elem => {
            return (elem.clientId === set.clientId) ? set : elem
        }));
    }

    const removeSet = (clientId: string) => {
        setSets(sets.filter(elem => elem.clientId !== clientId));
    }

    const fractions = "[3fr_2fr_1fr_1fr]";

    return (
        <Table className="flex flex-col w-[400px] max-h-[400px]">
            <TableHeader className="sticky top-0 z-1 bg-white">
                <TableRow className={`w-full grid grid-cols-${fractions} gap-4 border-1 rounded-tl-[10px] rounded-tr-[10px]`}>
                    <TableHead className="flex justify-start items-center px-4 py-0">Set</TableHead>
                    <TableHead className="flex justify-start items-center px-4 py-0">Weight (kg)</TableHead>
                    <TableHead className="flex justify-start items-center px-4 py-0">Reps</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sets.map((set, key) => 
                    <SetTableRow
                        key={key}
                        set={set}
                        updateSet={updateSet}
                        removeSet={removeSet}
                        className={`w-full grid grid-cols-${fractions} gap-4 !border-l-1 !border-r-1`}
                    />
                )}
            </TableBody>
        </Table>
    )
})