import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SetEnum } from "@/shared/types/SetAPI";


interface SetTypeSelectorProps {
    type: SetEnum
    types: SetEnum[]
    setType: (type: SetEnum) => void
    className?: string
}
export function SetTypeSelector({ type, types, setType, className }: SetTypeSelectorProps) {

    const CapitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return(
        <Select
            defaultValue={type}
            onValueChange={(value: string) => setType(value as SetEnum)}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {types.map(type => 
                        <SelectItem value={type}>{CapitalizeFirstLetter(type)}</SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}