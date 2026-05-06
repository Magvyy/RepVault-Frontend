import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import formatEnumToString from "@/shared/services/formatEnumToString";
import { ExerciseTypes, type ExerciseEnum } from "@/shared/types/ExerciseAPI";
import clsx from "clsx";


interface ExerciseTypeSelectorProps {
    type: ExerciseEnum
    setType: (type: ExerciseEnum) => void
    className?: string
}
export function ExerciseTypeSelector({ type, setType, className }: ExerciseTypeSelectorProps) {

    return(
        <Select
            value={type}
            onValueChange={(value: string) => setType(value as ExerciseEnum)}
        >
            <SelectTrigger className={clsx("base-class", className)}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {ExerciseTypes.map((type, key) => 
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