import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import formatEnumToString from "@/shared/services/formatEnumToString";
import { SetTypes, type SetEnum } from "@/shared/types/SetAPI";
import clsx from "clsx";


interface SetTypeSelectorProps {
    type: SetEnum
    setType: (type: SetEnum) => void
    className?: string
}
export function SetTypeSelector({ type, setType, className }: SetTypeSelectorProps) {
    console.log("rerendered set type input");

    return(
        <Select
            value={type}
            onValueChange={(value: string) => setType(value as SetEnum)}
        >
            <SelectTrigger className={clsx("base-class", className)}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {SetTypes.map((type, key) => 
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