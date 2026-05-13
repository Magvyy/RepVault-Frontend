import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UISet } from "@/shared/types/SetAPI";
import React from "react";
import { SetTableRowInput } from "./SetTableRowInput";

interface SetTableInputProps {
    sets: UISet[]
    setSets: (sets: UISet[]) => void
}
export const SetTableInput = React.memo( function SetTable({ sets, setSets }: SetTableInputProps) {
    const updateSet = (set: UISet) => {
        setSets(sets.map(elem => {
            return (elem.clientId === set.clientId) ? set : elem
        }));
    }

    const removeSet = (clientId: string) => {
        setSets(sets.filter(elem => elem.clientId !== clientId));
    }

    return (
        <Table className="flex flex-col w-full border-1 rounded-[10px]">
            <TableHeader className="sticky top-0 z-1">
                <TableRow className={`w-full grid grid-cols-[3fr_2fr_2fr_1fr] gap-4`}>
                    <TableHead className="flex justify-center items-center px-4 py-0">Set</TableHead>
                    <TableHead className="flex justify-center items-center px-4 py-0">Kg</TableHead>
                    <TableHead className="flex justify-center items-center px-4 py-0">Reps</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="max-h-[200px] overflow-auto scrollbar-hide">
                {sets.map((set, key) => 
                    <SetTableRowInput
                        key={key}
                        set={set}
                        updateSet={updateSet}
                        removeSet={removeSet}
                        className={`w-full grid grid-cols-[3fr_2fr_2fr_1fr] gap-4`}
                    />
                )}
            </TableBody>
        </Table>
    )
})