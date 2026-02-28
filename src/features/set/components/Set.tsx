import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { SetEnum, Set } from "@/shared/types/SetAPI";
import { useEffect, useState } from "react";
import { SetTypeSelector } from "./SetTypeSelector";
import { SetWeightInput } from "./SetWeightInput";
import { SetRepsInput } from "./SetRepsInput";


export function Set(set: Set) {
    const [type, setType] = useState<SetEnum>(set.type);
    const [reps, setReps] = useState<number>(set.reps);
    const [weight, setWeight] = useState<number>(set.weight);
    const [types, setTypes] = useState<SetEnum[]>([]);

    useEffect(() => {
        const fetchSetTypes = async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + "/types/sets", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Access-Control-Allow-Credentials": "true"
                }
            })
            const typesDTO = await response.json();
            setTypes(typesDTO);
        }
        fetchSetTypes();
    }, []);
    
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Set</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Reps</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <SetTypeSelector
                            type={type}
                            types={types}
                            setType={setType}
                        />
                    </TableCell>
                    <TableCell>
                        <SetWeightInput
                            weight={weight}
                            setWeight={setWeight}
                        />
                    </TableCell>
                    <TableCell>
                        <SetRepsInput
                            reps={reps}
                            setReps={setReps}
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}