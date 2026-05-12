import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import formatEnumToString from "../services/formatEnumToString"
import clsx from "clsx"

interface EnumSelectorProps <T extends string> {
    type: T
    setType: (type: T) => void
    types: T[]
    className?: string
}
export function EnumSelector <T extends string> ({ type, setType, types, className }: EnumSelectorProps <T>) {

    return(
        <Select
            value={type}
            onValueChange={(value: string) => setType(value as T)}
        >
            <SelectTrigger className={clsx("base-class", className)}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {types.map((type, key) => 
                        <SelectItem
                            key={key}
                            value={type}
                        >
                        {formatEnumToString(type as string)}
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}