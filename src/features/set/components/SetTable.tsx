import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SetTableRow } from "./SetTableRow";
import type { UISet, SetEnum } from "@/shared/types/SetAPI";
import { Button } from "@/components/ui/button";

interface SetTableProps {
    sets: UISet[]
    setSets: React.Dispatch<React.SetStateAction<UISet[]>>
}
export function SetTable({ sets, setSets }: SetTableProps) {
    const createNewSet = () => {
        const newSet = {
            clientId: crypto.randomUUID(),
            type: "NORMAL" as SetEnum,
            reps: 0,
            weight: 0
        }
        setSets(prev => [...prev, newSet])
    }

    const updateSet = (set: UISet) => {
        setSets(prev => prev.map(prevSet => {
            if (prevSet.clientId === set.clientId) return set
            else return prevSet
        }));
    }

    return (
        <div className="flex flex-col w-[400px] max-h-[400px]">
            <Table>
                <TableHeader className="sticky top-0 z-1 bg-white">
                    <TableRow className={"w-full grid grid-cols-[2fr_1fr_1fr] gap-4 border-1 rounded-tl-[10px] rounded-tr-[10px]"}>
                        <TableHead className="flex justify-start items-center px-4 py-0">Set</TableHead>
                        <TableHead className="flex justify-start items-center px-4 py-0">Weight</TableHead>
                        <TableHead className="flex justify-start items-center px-4 py-0">Reps</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sets.map((set, key) => 
                        <SetTableRow
                            key={key}
                            set={set}
                            updateSet={updateSet}
                            className={"w-full grid grid-cols-[2fr_1fr_1fr] gap-4 !border-l-1 !border-r-1"}
                        />
                    )}
                </TableBody>
            </Table>
            <div className="p-2 pt-4 border-1 rounded-bl-[10px] rounded-br-[10px]">
                <Button className="w-full" onClick={createNewSet}>
                    Add Set
                </Button>
            </div>
        </div>
    )
}