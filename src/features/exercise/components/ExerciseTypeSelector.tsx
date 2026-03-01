import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExerciseTypes, type ExerciseEnum } from "@/shared/types/ExerciseAPI";
import clsx from "clsx";


interface ExerciseTypeSelectorProps {
    type: ExerciseEnum
    setType: (type: ExerciseEnum) => void
    className?: string
}
export function ExerciseTypeSelector({ type, setType, className }: ExerciseTypeSelectorProps) {
    const CapitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return(
        <Select
            defaultValue={type}
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
                        {CapitalizeFirstLetter(type as string)}
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}